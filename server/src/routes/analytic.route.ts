import { analyticController } from '@anymid/controllers/analytic.controller';
import express, { Router } from 'express';

class AnalyticRoutes {
  router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/aggregated-data', analyticController.getAggregatedData);
    return this.router;
  }
}

export const analyticRoutes = new AnalyticRoutes();
