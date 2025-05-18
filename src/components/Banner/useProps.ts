import { useEffect, useContext } from "react";
import axios from "../../axios";
import { Movie, TmdbResponse, VideoResponse } from "../../type";
import { requests } from "../../request";
import { BannerDataContext } from "../../BannerDataContext";
import { useQuery } from "@tanstack/react-query";

export const useProps = () => {
  const { setMovie } = useContext(BannerDataContext);

  // react-queryを用いて初期データを取得
  const fetchMovie = async () => {
    const request = await axios.get<TmdbResponse>(
      requests.fetchNetflixOriginals
    );
    const randomIndex = Math.floor(Math.random() * request.data.results.length);
    const movieUrl = await axios.get<VideoResponse>(
      requests.fetchMovieVideos(request.data.results[randomIndex].id)
    );
    return {
      movieData: request.data.results[randomIndex] as Movie,
      movieUrl: movieUrl.data.results[0]?.key,
    };
  };

  const { data } = useQuery<{
    movieData: Movie;
    movieUrl: string | undefined;
  }>({
    queryKey: ["movie"],
    queryFn: fetchMovie,
  });

  useEffect(() => {
    if (data) {
      setMovie(data.movieData);
    }

    // fallbackでもう一度 fetch
    async function fetchData() {
      const request = await axios.get<TmdbResponse>(
        requests.fetchNetflixOriginals
      );
      const randomIndex = Math.floor(
        Math.random() * request.data.results.length
      );
      setMovie(request.data.results[randomIndex]);
    }

    fetchData();
  }, [data]);

  // descriptionの切り捨て用関数
  const truncate = (str: string | undefined, n: number): string => {
    if (!str) return "";
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return {
    truncate,
  };
};
