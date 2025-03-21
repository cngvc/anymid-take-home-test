import { analyticService } from '@anymid/services/analytic.service';
import { Request, Response } from 'express';

export class AnalyticController {
  async getAggregatedData(req: Request, res: Response) {
    const data = await analyticService.getAggregatedData();
    res.send({ message: 'Get aggregated data', metadata: data });
  }
}

export const analyticController = new AnalyticController();
