export interface Source {
  uri: string;
  dataType: string;
  title: string;
}

export interface Author {
  uri: string;
  name: string;
  type: string;
  isAgency: boolean;
}

export interface Result {
  uri: string;
  lang: string;
  isDuplicate: boolean;
  date: string;
  time: string;
  dateTime: Date;
  dateTimePub: Date;
  dataType: string;
  sim: number;
  url: string;
  title: string;
  body: string;
  source: Source;
  authors: Author[];
  image: string;
  eventUri: string;
  sentiment?: any;
  wgt: number;
  relevance: number;
}

export interface Articles {
  results: Result[];
  totalResults: number;
  page: number;
  count: number;
  pages: number;
}

export interface NewsApi {
  articles: Articles;
}
