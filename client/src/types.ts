export interface ICryptoDoc {
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
}

export interface IArticleDoc {
  title: string;
  source: string;
  url: string;
  slug: string;
}

export interface IWeatherDoc {
  condition: string;
  city: string;
  temperature: number;
}

export interface IAggregated {
  crypto: ICryptoDoc[];
  weather: IWeatherDoc[];
  latest_news: IArticleDoc[];
}
