import { config } from '@anymid/config';
import { CryptoModel, ICryptoDoc } from '@anymid/models/crypto.schema';
import { ArticleModel, IArticleDoc } from '@anymid/models/latest-news.scheme';
import { IWeatherDoc, WeatherModel } from '@anymid/models/weather.schema';
import axios from 'axios';

// - CoinGecko API (Cryptocurrency market data)
// - OpenWeather API (Weather data)
// - NewsAPI (Latest news)
// - JSONPlaceholder (Mock data for users, posts, etc.)

const COINGECKO_ENDPOINT = 'https://api.coingecko.com/api/v3';
const OPENWEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5';
const NEWSAPI_ENDPOINT = 'https://newsapi.org/v2';

class SeedService {
  createSeedData = async () => {
    await this.weatherSeed();
    await this.coinSeed();
    await this.newsSeed();
  };

  private async weatherSeed() {
    const existingWeather = await WeatherModel.countDocuments();
    if (!existingWeather) {
      console.log('Creating weather seed data');
      try {
        const { data } = await axios.get(
          `${OPENWEATHER_ENDPOINT}/group?appid=${config.OPENWEATHER_API_KEY}&id=1581130,1566083,1583992,1581298,1586203&units=metric`
        );
        const weathers: IWeatherDoc[] = [];
        for (const weather of data.list) {
          weathers.push({
            city: weather.name,
            temperature: weather.main.temp,
            condition: weather.weather[0].description
          });
        }
        console.log(`Inserting ${weathers.length} documents`);
        await WeatherModel.insertMany(weathers);
      } catch (error) {
        console.log(error);
        console.error('Cannot fetch weather data!.');
      }
    }
  }

  private async coinSeed() {
    const existingCrypto = await CryptoModel.countDocuments();
    if (!existingCrypto) {
      console.log('Creating crypto seed data');
      try {
        const { data } = await axios.get(
          `${COINGECKO_ENDPOINT}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&locale=en`
        );
        const coins: ICryptoDoc[] = [];
        for (const coin of data) {
          coins.push({
            market_cap: coin.market_cap,
            name: coin.name,
            price: coin.current_price,
            symbol: coin.symbol
          });
        }
        console.log(`Inserting ${coins.length} documents`);
        await CryptoModel.insertMany(coins);
      } catch (error) {
        console.error('Cannot fetch coin data!.');
      }
    }
  }

  private async newsSeed() {
    const existingArticle = await ArticleModel.countDocuments();
    if (!existingArticle) {
      console.log('Creating article seed data');
      try {
        const { data } = await axios.get(
          `${NEWSAPI_ENDPOINT}/everything?apiKey=${config.NEWSAPI_KEY}&domains=techcrunch.com&sortBy=relevancy`
        );
        const articles: IArticleDoc[] = [];
        for (const article of data.articles) {
          articles.push({
            source: article.source.name,
            title: article.title,
            url: article.url
          });
        }
        console.log(`Inserting ${data.articles.length} documents`);
        await ArticleModel.insertMany(articles);
      } catch (error) {
        console.log(error);
        console.error('Cannot fetch article data!.');
      }
    }
  }
}

export const seedService = new SeedService();
