import { redisCache } from '@anymid/redis.connection';
import { NextFunction, Request, Response } from 'express';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60;

export const redisRateLimiterStrategy = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown';
  const key = `user-ip:${ip}`;
  const requestedByIP = await redisCache.client.incr(key);
  if (requestedByIP === 1) {
    await redisCache.client.expire(key, RATE_LIMIT_WINDOW);
  }
  if (requestedByIP > RATE_LIMIT_MAX) {
    res.status(429).json({ error: 'Too many requests, please wait before retrying.' });
    return;
  }
  next();
};
