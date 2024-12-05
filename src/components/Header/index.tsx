// コンポーネントのエントリポイントを定義している。他の2つのファイルをインポートして、統合した形でエクスポートする役割
import { useProps } from "./useProps";
import { Layout } from "./Layout";

export const Header = () => {
  return <Layout {...useProps()} />;
};
