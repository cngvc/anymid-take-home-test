import { SERVER_PORT, SERVICE_NAME } from '@anymid/constants';
import { appRoutes } from '@anymid/routes';
import compression from 'compression';
import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import { redisRateLimiterStrategy } from './middleware/redis-rate-limit.middleware';

export class UserServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  start = async (): Promise<void> => {
    this.standardMiddleware();
    this.securityMiddleware();
    this.routesMiddleware();
    this.startServer();
  };

  private securityMiddleware() {
    this.app.set('trust proxy', 1);
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(): void {
    this.app.use(compression());
    this.app.use(json({ limit: '5mb' }));
    this.app.use(urlencoded({ extended: true, limit: '5mb' }));

    // rate limiting solution 1: express-rate-limit
    // this.app.use(
    //   rateLimit({
    //     windowMs: 60 * 1000,
    //     max: 5,
    //     message: { error: 'Too many requests, please wait before retrying.' },
    //     headers: true
    //   })
    // );

    // rate limiting solution 2: redis
    this.app.use(redisRateLimiterStrategy);
  }

  private routesMiddleware() {
    appRoutes(this.app);
  }

  private async startServer(): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(this.app);
      this.startHttpServer(httpServer);
      console.info(SERVICE_NAME + ` has started with process id ${process.pid}`);
    } catch (error) {
      console.error(error);
    }
  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {
      httpServer.listen(SERVER_PORT, '0.0.0.0', () => {
        console.info(SERVICE_NAME + ` has started on port ${SERVER_PORT}`);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
