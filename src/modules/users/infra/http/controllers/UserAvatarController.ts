import { Request, Response } from 'express';
import { container } from 'tsyringe';
import updadeAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(updadeAvatarService);
    console.log(request.file)
    const user = await service.execute({ user_id: request.user.id, avatarFilename: request.file.filename });

    return response.json({ user });
  }
}
