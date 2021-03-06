import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import config from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, config.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub
    }

    return next();
  } catch (error) {
    throw new AppError('Invalid Token.', 401);
  }

}
