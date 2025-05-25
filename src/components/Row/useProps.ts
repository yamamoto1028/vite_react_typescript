// コンポーネントのロジック部分を定義している

import { useContext } from "react";
import axios from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { Movie, TmdbResponse, VideoResponse } from "../../type.ts";
import { requests } from "../../request.ts";
import { BannerDataContext } from "../../BannerDataContext.tsx";

export const useProps = (fetchUrl: string, title: string) => {
  // const [movies, setMovies] = useState<Movie[]>([]); // ①APIの取得はuseEffectを使う
  const { setTrailerUrl, setMovie } = useContext(BannerDataContext);

  const fetchData = async () => {
    const request = await axios.get<TmdbResponse>(fetchUrl);
    return request.data.results.slice(0, 10).map((movie: Movie) => ({
      id: movie.id,
      name: movie.name,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
    }));
  };
  // useEffect(() => {
  //   async function fetchData() {
  //     //非同期処理
  //     const request = await axios.get<TmdbResponse>(fetchUrl);
  //     // ②データの整形
  //     const movies = request.data.results.map((movie) => ({
  //       id: movie.id,
  //       name: movie.name || movie.title || "Unknown",
  //       poster_path: movie.poster_path,
  //       backdrop_path: movie.backdrop_path,
  //     }));
  //     setMovies(movies);
  //     return request;
  //   }
  //   fetchData();
  // }, [fetchUrl]);

  // react-queryを用いてfetchDataを実行
  // const { data: movies, isLoading } = useQuery(`${title}/movies`, fetchData);←ver.4の書き方。ver.5だと型エラーが出るのが正常。
  const { data: movies, isLoading } = useQuery({
    queryKey: [title, "/movies"],
    queryFn: fetchData,
  });

  const handleClick = async (movie: Movie) => {
    const moviePlayUrl = await axios.get<VideoResponse>(
      requests.fetchMovieVideos(movie.id)
    );
    setTrailerUrl(moviePlayUrl.data.results[0]?.key);
    setMovie(movie);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // const handleClick = async (movie: Movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     const moviePlayUrl = await axios.get<VideoResponse>(
  //       requests.fetchMovieVideos(movie.id)
  //     );
  //     setTrailerUrl(moviePlayUrl.data.results[0]?.key);
  //   }
  // };
  return {
    movies: movies ?? [],
    handleClick,
    isLoading,
  };
};
