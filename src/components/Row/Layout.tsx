// コンポーネントのUI部分を定義している
import { Movie } from "../../type.ts";
import YouTube from "react-youtube";

export type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type LayoutProps = {
  title: string;
  movies: Movie[];
  isLargeRow?: boolean;
  trailerUrl: string | null;
  handleClick: (movie: Movie) => void;
  isLoading: boolean;
};
type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Layout = ({
  title,
  movies,
  isLargeRow,
  handleClick,
  trailerUrl,
  isLoading,
}: LayoutProps) => {
  const image_url = "https://image.tmdb.org/t/p/original";
  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="ml-5 text-white">
      <h2>{title}</h2>
      <div className="box1 flex overflow-y-hidden overflow-x-scroll p-5 scrollbar-hide">
        {/* isLoadingなら表示なし */}
        {!isLoading &&
          movies.map(
            (
              movie // ①DOM表示にmapを使う際はkeyを必ず設定する => (
            ) => (
              <img
                className={`object-contain w-full max-h-24 m-2 transform transition-transform duration-450 ${
                  isLargeRow ? "max-h-60 hover:scale-110" : "hover:scale-108"
                }`}
                key={movie.id} // ②使用する画像を使い分ける
                src={`${image_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                onClick={() => handleClick(movie)}
                alt={`${movie.name} No Image`}
              />
            )
          )}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
