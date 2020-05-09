import { Router } from 'express';
import checkJwt from '@shared/infra/http/middlewares/checkJwt';

import ProfileController from '../controllers/ProfileController';

const Routes = Router();
const profileController = new ProfileController();

Routes.use(checkJwt);
Routes.put('/', profileController.update);

export default Routes;
