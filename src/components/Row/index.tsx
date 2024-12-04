// コンポーネントのエントリポイントを定義している。他の2つのファイルをインポートして、統合した形でエクスポートする役割

import { useProps } from "./useProps";
import { Layout } from "./layout";

type Props = {
  title?: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const movies = useProps(fetchUrl);

  if (!movies.length) {
    return <p>Loading...</p>; // ローディング状態を表示
  }

  return <Layout title={title} movies={movies} isLargeRow={isLargeRow} />;
};
