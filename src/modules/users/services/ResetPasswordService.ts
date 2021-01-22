import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface Request {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('UsersTokenRepository')
    private tokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashRepository: IHashProvider,
    ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const usertoken = await this.tokenRepository.findByToken(token);
    if (!usertoken) {
      throw new AppError('User token not exists');
    }
    const user = await this.repository.findById(usertoken.user_id);
    if (!user) {
      throw new AppError('User token not exists');
    }

    const tokenCreatedAt = usertoken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashRepository.generateHash(password);
    await this.repository.save(user);
  }

}

export default ResetPasswordService;
