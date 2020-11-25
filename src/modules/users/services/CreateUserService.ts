import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  public async execute({ name, email, password }: Request): Promise<User> {
    const repository = getRepository(User);
    const exist = await repository.findOne({ where: { email } });

    if (exist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = repository.create({
      name, email, password: hashedPassword
    });

    await repository.save(user);

    return user;
  }

}

export default CreateUserService;