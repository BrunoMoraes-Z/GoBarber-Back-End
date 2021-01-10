import path from 'path';
import fs from 'fs';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';

interface Request {
  user_id: string,
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private repository : IUsersRepository,

    @inject('StorageProvider')
    private storageProvider : IStorageProvider
    ) {}

  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppError('Only authneticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;
    await this.repository.save(user);

    delete user.password;

    return user;
  }

}

export default UpdateUserAvatarService;
