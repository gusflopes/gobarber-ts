import { Router } from 'express';
import checkJwt from '@shared/infra/http/middlewares/checkJwt';
import ProvidersController from '../controllers/ProvidersController';

import MonthlyAvailabilityController from '../controllers/MonthlyAvailabilityController';
import DailyAvailabilityController from '../controllers/DailyAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const monthlyAvailabilityController = new MonthlyAvailabilityController();
const dailyAvailabilityController = new DailyAvailabilityController();

providersRouter.use(checkJwt);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/available-days',
  monthlyAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/available-times',
  dailyAvailabilityController.index,
);

export default providersRouter;
