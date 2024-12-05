import axios from "axios";

//TMDBからのbaseURLリクエストを作成
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
// この後、TMDBからカテゴリー別でAPIを複数叩いてデータを取得するが、この際に使い回ししやすいようにaxios.tsでインスタンスを作成
