import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../entities/User';
import uploadConfig from '../../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new Error('Somente usuário autenticado pode alterar o avatar.');
    }

    if (user.avatar) {
      // deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Atualizar avatar no banco de dados
    user.avatar = avatarFilename;
    await userRepository.save(user);

    return user;
  }
}