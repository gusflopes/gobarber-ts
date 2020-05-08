import { Router } from 'express';
import multer from 'multer';
import checkJwt from '@shared/infra/http/middlewares/checkJwt';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const Routes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

Routes.post('/', usersController.store);

Routes.use(checkJwt);

Routes.patch('/avatar', upload.single('avatar'), userAvatarController.update);

export default Routes;
