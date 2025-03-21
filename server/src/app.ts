import { UserServer } from '@anymid/server';
import express, { Express } from 'express';
import { database } from './database';
import { redisCache } from './redis.connection';
import { seedService } from './services/seed.service';

class Application {
  public initialize() {
    const app: Express = express();
    const server = new UserServer(app);
    database.connection();
    server.start();

    // redis connect
    redisCache.checkConnection();

    // create seed data
    seedService.createSeedData();
  }
}

const application = new Application();
application.initialize();
