import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import path from 'path';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private tokenRepository: IUserTokenRepository,
    ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.tokenRepository.generate(user.id);

    const pathFile = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de Senha.',
      templateData: {
        file: pathFile,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    });
  }

}

export default SendForgotPasswordEmailService;
