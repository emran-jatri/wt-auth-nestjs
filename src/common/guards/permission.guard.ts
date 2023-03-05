import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HAS_PERMISSION_KEY } from '../decorators';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride<string>(
      HAS_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!permission) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const hasPermission = user.permissions.includes(permission);
    if (hasPermission) {
      return true;
    }
    throw new HttpException('Permission Denied!', HttpStatus.FORBIDDEN);
  }
}
