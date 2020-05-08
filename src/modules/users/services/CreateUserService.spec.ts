import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  let createUserService: CreateUserService;

  beforeEach(() => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeRepository, fakeHashProvider);
  });

  it('should be able create a new appointment', async () => {
    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonh@doe.com',
      password: 'reallySecretPassword1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('should encrypt the password', async () => {
    const password = 'reallySecretPassword1234';
    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonh@doe.com',
      password: 'reallySecretPassword1234',
    });

    expect(user.id).not.toBe(password);
  });

  it('should not be able to create a new user with existent email address', async () => {
    const userData = {
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: 'reallySecretPassword1234',
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
