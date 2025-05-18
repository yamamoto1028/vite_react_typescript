// コンポーネントのUI部分を定義している
import { Movie } from "../../type.ts";

export type Props = {
  title: string;
  fetchUrl: string;
};

type LayoutProps = {
  title: string;
  movies: Movie[];
  handleClick: (movie: Movie) => void;
  isLoading: boolean;
};

export const Layout = ({
  title,
  movies,
  handleClick,
  isLoading,
}: LayoutProps) => {
  const image_url = "https://image.tmdb.org/t/p/original";
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
                className={`object-contain w-full max-h-24 m-2 transform transition-transform duration-450`}
                key={movie.id} // ②使用する画像を使い分ける
                src={
                  movie.poster_path
                    ? `${image_url}${movie.backdrop_path}`
                    : `../../../public/vite.svg`
                }
                onClick={() => handleClick(movie)}
                alt={`${movie.name} No Image`}
              />
            )
          )}
      </div>
    </div>
  );
};
