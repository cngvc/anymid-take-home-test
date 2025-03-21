import { BASE_PATH } from '@anymid/constants/path';
import { analyticRoutes } from '@anymid/routes/analytic.route';
import { healthRoutes } from '@anymid/routes/health.route';
import { Application } from 'express';

const appRoutes = (app: Application): void => {
  app.use(BASE_PATH, healthRoutes.routes());
  app.use(BASE_PATH, analyticRoutes.routes());
};

export { appRoutes };
