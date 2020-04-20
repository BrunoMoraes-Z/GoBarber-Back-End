import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

interface Request {
  user_id: string,
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const repository = getRepository(User);

    const user = await repository.findOne(user_id);

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
    await repository.save(user);

    delete user.password;

    return user;
  }

}

export default UpdateUserAvatarService;
