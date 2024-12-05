export type Movie = {
  id: string;
  name?: string;
  tite?: string;
  poster_path: string;
  backdrop_path: string;
  overview?: string;
};

export type TmdbResponse = {
  results: Array<{
    id: string;
    name?: string;
    title?: string;
    poster_path: string;
    backdrop_path: string;
    overview?: string;
  }>;
};
export type VideoResponse = {
  results: Array<{
    key: string; // YouTube 動画のキー
    name: string; // 動画の名前
    site: string; // 動画のホスティングサイト (e.g., "YouTube")
    type: string; // 動画の種類 (e.g., "Trailer")
  }>;
};
