// コンポーネントのロジック部分を定義している

import { useEffect, useState } from "react";
import axios from "../../axios";
import { Movie, TmdbResponse, VideoResponse } from "../../type";
import { requests } from "../../request";

export const useProps = (fetchUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]); // ①APIの取得はuseEffectを使う
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  useEffect(() => {
    async function fetchData() {
      //非同期処理
      const request = await axios.get<TmdbResponse>(fetchUrl);
      // ②データの整形
      const movies = request.data.results.map((movie) => ({
        id: movie.id,
        name: movie.name || movie.title || "Unknown",
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
      }));
      setMovies(movies);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const moviePlayUrl = await axios.get<VideoResponse>(
        requests.fetchMovieVideos(movie.id)
      );
      setTrailerUrl(moviePlayUrl.data.results[0]?.key);
    }
  };
  return {
    movies,
    trailerUrl,
    handleClick,
  };
};
