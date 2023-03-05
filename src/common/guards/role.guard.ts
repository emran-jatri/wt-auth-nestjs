import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserType = this.reflector.getAllAndOverride<string>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredUserType) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return user.userType === requiredUserType;
  }
}
