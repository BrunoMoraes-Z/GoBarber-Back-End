import { sign } from 'jsonwebtoken';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import config from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface Request {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {}

  public async execute({ email, password }: Request): Promise<{user: User, token: string}> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, config.jwt.secret, {
      subject: user.id,
      expiresIn: config.jwt.expiresIn
    });

    return {user, token}

  }

}

export default AuthenticateUserService;
