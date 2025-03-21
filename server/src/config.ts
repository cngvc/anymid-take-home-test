import { config as dotenvConfig } from 'dotenv';
dotenvConfig({});

class Config {
  public CLIENT_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public DATABASE_URL: string | undefined;
  public OPENWEATHER_API_KEY: string | undefined;
  public NEWSAPI_KEY: string | undefined;
  public REDIS_HOST: string | undefined;

  constructor() {
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';
    this.NEWSAPI_KEY = process.env.NEWSAPI_KEY || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
  }
}

export const config: Config = new Config();
