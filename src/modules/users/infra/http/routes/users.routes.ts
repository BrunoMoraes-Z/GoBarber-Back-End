import { Router } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import authentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import updadeAvatarService from '@modules/users/services/UpdateUserAvatarService';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const service = container.resolve(CreateUserService);

    const user = await service.execute({ name, email, password });

    delete user.password;

    response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', authentication, upload.single('avatar'), async (request, response) => {
  const service = container.resolve(updadeAvatarService);
  console.log(request.file)
  const user = await service.execute({ user_id: request.user.id, avatarFilename: request.file.filename });

  return response.json({ user });
});

export default usersRouter;
