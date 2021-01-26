import UpdateUserAvatarService from "./UpdateUserAvatarService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/storageProvider/fakes/FakeStorageProvider';
import AppError from "@shared/errors/AppError";

let repository: FakeUsersRepository;
let fake_repository: FakeStorageProvider;
let service: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {

  beforeEach(() => {
    repository = new FakeUsersRepository();
    fake_repository = new FakeStorageProvider();
    service = new UpdateUserAvatarService(repository, fake_repository);
  });

  it('should be able to create a new user', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const response = await service.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(service.execute({
      user_id: 'batata',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deletefile = jest.spyOn(fake_repository, 'deleteFile');
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    await service.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    await service.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    });

    expect(deletefile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });

});
