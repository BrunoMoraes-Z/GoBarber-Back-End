import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;
    const service = container.resolve(ResetPasswordService)
    await service.execute({ token, password });

    return response.status(204).json();
  }
}
