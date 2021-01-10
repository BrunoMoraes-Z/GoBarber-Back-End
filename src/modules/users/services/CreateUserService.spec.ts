import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const repository = new FakeUsersRepository();
    const fake_repository = new FakeHashProvider();
    const service = new CreateUserService(repository, fake_repository);

    const user = await service.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const repository = new FakeUsersRepository();
    const fake_repository = new FakeHashProvider();
    const service = new CreateUserService(repository, fake_repository);

    await service.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    });

    expect(service.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

});
