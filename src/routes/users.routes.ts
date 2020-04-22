import { Router, Request, Response } from 'express';
import CreateUserService from '../app/services/CreateUserService';

const Routes = Router();

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

export default Routes;
