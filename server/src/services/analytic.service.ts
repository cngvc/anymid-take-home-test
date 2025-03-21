import { CryptoModel } from '@anymid/models/crypto.schema';
import { ArticleModel } from '@anymid/models/latest-news.scheme';
import { WeatherModel } from '@anymid/models/weather.schema';

class AnalyticService {
  async getAggregatedData() {
    const crypto = await CryptoModel.find();
    const weather = await WeatherModel.find();
    const latest_news = await ArticleModel.find();
    return {
      crypto,
      weather,
      latest_news
    };
  }
}

export const analyticService = new AnalyticService();
