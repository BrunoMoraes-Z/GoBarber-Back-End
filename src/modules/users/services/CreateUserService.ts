import { hash } from 'bcryptjs';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private repository : IUsersRepository
    ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const exist = await this.repository.findByEmail(email);

    if (exist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.repository.create({
      name, email, password: hashedPassword
    });

    return user;
  }

}

export default CreateUserService;
