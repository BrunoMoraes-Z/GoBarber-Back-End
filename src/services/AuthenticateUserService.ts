import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import config from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {

  public async execute({ email, password }: Request): Promise<{user: User, token: string}> {
    const repository = getRepository(User);

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched){
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, config.jwt.secret, {
      subject: user.id,
      expiresIn: config.jwt.expiresIn
    });

    return {user, token}

  }

}

export default AuthenticateUserService;
