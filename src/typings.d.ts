type GlobalConfig = {
  imgServer: string;
  site: string;
};
declare const GLOBAL_CONFIG: GlobalConfig;

type MovieChannelType = 'trending' | 'popular';

type MoviePostInfo = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};
