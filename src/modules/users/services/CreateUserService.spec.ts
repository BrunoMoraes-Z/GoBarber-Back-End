import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";

let repository: FakeUsersRepository;
let fake_repository: FakeHashProvider;
let service: CreateUserService;

describe('CreateUser', () => {

  beforeEach(() => {
    repository = new FakeUsersRepository();
    fake_repository = new FakeHashProvider();
    service = new CreateUserService(repository, fake_repository);
  });

  it('should be able to create a new user', async () => {
    const user = await service.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await service.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    });

    await expect(service.execute({
      name: 'John Doe',
      email: 'johndoe@robot-mail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

});
