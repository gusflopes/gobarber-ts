import { Router } from 'express';
import checkJwt from '@shared/infra/http/middlewares/checkJwt';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(checkJwt);

providersRouter.get('/', providersController.index);

export default providersRouter;
