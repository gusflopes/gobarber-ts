import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const Routes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

Routes.post('/forgot', forgotPasswordController.store);
Routes.post('/reset', resetPasswordController.store);

export default Routes;
