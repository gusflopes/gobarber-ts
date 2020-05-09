import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const Routes = Router();
const sessionsController = new SessionsController();

Routes.post('/', sessionsController.store);

export default Routes;
