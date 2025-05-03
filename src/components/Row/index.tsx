// コンポーネントのエントリポイントを定義している。他の2つのファイルをインポートして、統合した形でエクスポートする役割

import { useProps } from "./useProps";
import { Layout, Props } from "./Layout";

export const Row = ({ title, fetchUrl }: Props) => {
  return <Layout title={title} {...useProps(fetchUrl, title)} />;
};
