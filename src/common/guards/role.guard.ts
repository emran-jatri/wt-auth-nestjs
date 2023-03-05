import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RoleEnum } from '../enums';
import { GQLForbiddenException } from '../helpers';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const { user } = GqlExecutionContext.create(context).getContext().req;
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      GQLForbiddenException('Banned User!');
    }
    return true;
  }
}
