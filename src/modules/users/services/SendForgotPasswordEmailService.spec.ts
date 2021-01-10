import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider';
import AppError from "@shared/errors/AppError";

let repository: FakeUsersRepository;
let fake_mail: FakeMailProvider;
let fake_token: FakeUserTokenRepository;
let service: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    fake_mail = new FakeMailProvider();
    fake_token = new FakeUserTokenRepository();
    service = new SendForgotPasswordEmailService(repository, fake_mail, fake_token);
  });

  it('should be able recover the password using email', async () => {
    const sendMail = jest.spyOn(fake_mail, 'sendMail');

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

  it('should not be able to recever a non-existing user password', async () => {
    await expect(service.execute({
      email: 'johndoe@gmail.com'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fake_token, 'generate');

    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    await service.execute({
      email: 'johndoe@gmail.com'
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  })

});
