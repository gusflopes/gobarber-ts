import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../app/services/AuthenticateUserService'

const Routes = Router();

Routes.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService()

    const { user, token } = await authenticateUserService.execute({ email, password })

    delete user.password;

    return response.json({ user, token })

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default Routes;
