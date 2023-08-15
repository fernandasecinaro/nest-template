import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { $Enums } from '@prisma/client';
import { Request } from 'express';
import { ROLES_KEY } from './roles.decorator';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<$Enums.Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('A token is required for authentication');
    }

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }

      request['user'] = user;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
