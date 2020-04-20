import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import authentication from '../middlewares/ensureAuthnticated';
import updadeAvatarService from '../services/UpdateUserAvatarService';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const service = new CreateUserService();

    const user = await service.execute({ name, email, password });

    delete user.password;

    response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', authentication, upload.single('avatar'), async (request, response) => {
  const service = new updadeAvatarService();
  const user = await service.execute({ user_id: request.user.id, avatarFilename: request.file.filename });

  return response.json({ user });
});

export default usersRouter;
