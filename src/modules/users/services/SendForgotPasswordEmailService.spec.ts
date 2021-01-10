import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import AppError from "@shared/errors/AppError";

describe('SendForgotPasswordEmail', () => {
  it('should be able recover the password using email', async () => {
    const repository = new FakeUsersRepository();
    const fake = new FakeMailProvider();

    const sendMail = jest.spyOn(fake, 'sendMail');

    const service = new SendForgotPasswordEmailService(repository, fake);

    await repository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    await service.execute({
      email: 'johndoe@gmail.com'
    });

    expect(sendMail).toHaveBeenCalled();
  });

});
