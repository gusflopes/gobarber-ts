import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendResetPasswordMailService from '@modules/users/services/SendResetPasswordMailService';

export default class ForgotPasswordController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendResetPasswordMail = container.resolve(
      SendResetPasswordMailService,
    );

    await sendResetPasswordMail.execute({
      email,
    });

    return response.status(204).json();
  }
}
