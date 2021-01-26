import ResetPasswordService from "./ResetPasswordService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";

let repository: FakeUsersRepository;
let fake_token: FakeUserTokenRepository;
let service: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    fake_token = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    service = new ResetPasswordService(repository, fake_token, fakeHashProvider);
  });

  it('should be able to reset the password', async () => {

    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456'
    });

    const { token } = await fake_token.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await service.execute({
      password: '123123',
      token
    })

    const updated_user = await repository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updated_user?.password).toBe('123123');

  });

  it('should not be able to reset the password with non-existing token', async () => {

    expect(service.execute({
      token: 'invalid token',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fake_token.generate('invalid-user');

    await expect(service.execute({
      token: token,
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456'
    });

    const { token } = await fake_token.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(service.execute({
      password: '123456',
      token
    })).rejects.toBeInstanceOf(AppError);
  });

});
