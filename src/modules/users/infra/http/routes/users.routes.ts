import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import checkJwt from '@shared/infra/http/middlewares/checkJwt';
import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { container } from 'tsyringe';

const Routes = Router();
const upload = multer(uploadConfig);

Routes.post('/', async (request: Request, response: Response) => {
  const { password, name, email } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

Routes.patch(
  '/avatar',
  checkJwt,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default Routes;
