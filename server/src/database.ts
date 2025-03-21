import mongoose from 'mongoose';
import { config } from './config';
import { SERVICE_NAME } from './constants';

export class Database {
  public async connection() {
    try {
      await mongoose.connect(`${config.DATABASE_URL}`, {
        serverSelectionTimeoutMS: 5000
      });
      console.info(SERVICE_NAME + ' MongoDB database connection has been established successfully');
    } catch (error) {
      console.error(SERVICE_NAME + ' unable to connect to db');
      process.exit(1);
    }
  }
}

export const database = new Database();
