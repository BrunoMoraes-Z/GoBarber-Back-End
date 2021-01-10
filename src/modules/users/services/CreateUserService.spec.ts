import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from "@shared/errors/AppError";

describe('CreateUser', () => {
  it('sould be able to create a new user', async () => {
    const repository = new FakeUsersRepository()
    const service = new CreateUserService(repository);

    const user = await service.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('sould not be able to create a new user with same email from another', async () => {
    const repository = new FakeUsersRepository()
    const service = new CreateUserService(repository);

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
