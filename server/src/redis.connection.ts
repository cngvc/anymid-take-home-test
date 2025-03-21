import Redis from 'ioredis';
import { config } from './config';
import { SERVICE_NAME } from './constants';

class RedisCache {
  client: Redis;

  constructor() {
    this.client = new Redis(`${config.REDIS_HOST}`);

    this.client.on('connect', () => {
      console.info(`${SERVICE_NAME}: ✅ Redis Connected`);
    });

    this.client.on('reconnecting', () => {
      console.info(`🏋️‍♂️ ${SERVICE_NAME}: Redis Reconnecting`);
    });

    this.client.on('error', (error: unknown) => {
      console.error(error, '❌ Redis connect listener error');
    });
  }

  async checkConnection() {
    try {
      await this.client.ping();
    } catch (error) {
      console.error(error, '❌ Redis check connection error');
    }
  }
}

export const redisCache = new RedisCache();
