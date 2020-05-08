// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
// import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

describe('ResetPassword', () => {
  let resetPassword: ResetPasswordService;
  let fakeUserRepository: FakeUsersRepository;
  let fakeMailProvider: FakeMailProvider;

  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using email address', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await resetPassword.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
