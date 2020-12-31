import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';
import authentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', userController.create);

usersRouter.patch('/avatar', authentication, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
