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
