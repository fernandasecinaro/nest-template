import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Middlewares could be a class or a function. They run before the route handler (controller method)
// The functional middlewares is preferred when you don't need to inject dependencies

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request middleware function...');
  next();
};
