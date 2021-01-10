import path from 'path';
import fs from 'fs';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface Request {
  user_id: string,
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private repository : IUsersRepository
    ) {}

  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppError('Only authneticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
      const existUserAvatar = await fs.promises.stat(userAvatarPath);
      if (existUserAvatar) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = avatarFilename;
    await this.repository.save(user);

    delete user.password;

    return user;
  }

}

export default UpdateUserAvatarService;
