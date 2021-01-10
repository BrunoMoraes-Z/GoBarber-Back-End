import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";

describe('Authenticate', () => {
  it('should be able to authenticate', async () => {
    const repository = new FakeUsersRepository();
    const fake_repository = new FakeHashProvider();
    const service = new AuthenticateUserService(repository, fake_repository);
    const createService = new CreateUserService(repository, fake_repository);

    const user = await createService.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    });


    const response = await service.execute({
      email: 'johndoe@robot-mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const repository = new FakeUsersRepository();
    const fake_repository = new FakeHashProvider();
    const service = new AuthenticateUserService(repository, fake_repository);

    await expect(service.execute({
      email: 'johndoe@robot-mail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const repository = new FakeUsersRepository();
    const fake_repository = new FakeHashProvider();
    const service = new AuthenticateUserService(repository, fake_repository);
    const createService = new CreateUserService(repository, fake_repository);

    await createService.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    });

    await expect(service.execute({
      email: 'johndoe@robot-mail.com',
      password: '123456a',
    })).rejects.toBeInstanceOf(AppError);
  });

});
