import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PermissionEnum } from '../enums';
import { GQLForbiddenException } from '../helpers';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<PermissionEnum[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!permissions) {
      return true;
    }
    const { user } = GqlExecutionContext.create(context).getContext().req;
    const hasPermission = permissions.some((permission) =>
      user.permissions.includes(permission),
    );
    if (!hasPermission) {
      GQLForbiddenException('Permission Denied!');
    }
    return true;
  }
}
