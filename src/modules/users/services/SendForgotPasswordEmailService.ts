import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
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
    ) {}

  public async execute({ email }: Request): Promise<void> {
    await this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
  }

}

export default SendForgotPasswordEmailService;
