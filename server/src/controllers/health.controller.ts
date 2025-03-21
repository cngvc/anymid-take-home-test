import { SERVICE_NAME } from '@anymid/constants';
import { Request, Response } from 'express';

export class HealthController {
  public health(req: Request, res: Response) {
    res.send({ message: SERVICE_NAME + ' is healthy.' });
  }
}

export const healthController = new HealthController();
