// コンポーネントのロジック部分を定義している

import { useEffect, useState } from "react";
import axios from "../../axios";

// ②データの整形
export type Movie = {
  id: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

type TmdbResponse = {
  results: Array<{
    id: string;
    name?: string;
    title?: string;
    poster_path: string;
    backdrop_path: string;
  }>;
};

export const useProps = (fetchUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]); // ①APIの取得はuseEffectを使う

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
      // console.log(movies);

      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return movies;
};
