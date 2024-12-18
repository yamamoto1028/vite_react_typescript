// コンポーネントのエントリポイントを定義している。他の2つのファイルをインポートして、統合した形でエクスポートする役割

import { useProps } from "./useProps";
import { Layout } from "./Layout";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  return (
    <Layout title={title} isLargeRow={isLargeRow} {...useProps(fetchUrl)} />
  );
};
