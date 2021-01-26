import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";

let repository: FakeUsersRepository;
let fake_repository: FakeHashProvider;
let service: AuthenticateUserService;
let createService: CreateUserService;

describe('Authenticate', () => {

  beforeEach(() => {
    repository = new FakeUsersRepository();
    fake_repository = new FakeHashProvider();
    service = new AuthenticateUserService(repository, fake_repository);
    createService = new CreateUserService(repository, fake_repository);
  });

  it('should be able to authenticate', async () => {
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
    await expect(service.execute({
      email: 'johndoe@robot-mail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
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
