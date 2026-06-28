import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  require('fs').writeFileSync('last-error.txt', String(err.stack || err.message));
  logger.error(err.message, { stack: err.stack, ...err });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code || 'ERROR', message: err.message }
    });
  }

  res.status(500).json({ error: { code: 'INTERNAL_SERVER_ERROR', message: err.message || 'Internal Server Error' } });
};
