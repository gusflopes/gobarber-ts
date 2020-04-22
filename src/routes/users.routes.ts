import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreateUserService from '../app/services/CreateUserService';
import checkJwt from '../app/middlewares/checkJwt';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../app/services/UpdateUserAvatarService';

const Routes = Router();
const upload = multer(uploadConfig);

Routes.post('/', async (request: Request, response: Response) => {
  try {
    const { password, name, email } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

Routes.patch(
  '/avatar',
  checkJwt,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();
      console.log(request.file);
      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default Routes;
