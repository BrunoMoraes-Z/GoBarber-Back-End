import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const service = new AuthenticateUserService();
  const { user, token } = await service.execute({ email, password });

  delete user.password;

  response.json({ user, token });
});

export default sessionsRouter;
