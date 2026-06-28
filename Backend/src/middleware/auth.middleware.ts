import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // DISABLE LOGIN FOR DEVELOPMENT
  req.user = { id: 'dev-user', role: 'ADMIN', name: 'Dev User', email: 'dev@vintech.com' };
  return next();
};
