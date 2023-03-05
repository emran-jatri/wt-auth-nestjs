import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log(
      '🚀 ~ file: gql-auth.guard.ts:14 ~ GqlAuthGuard ~ getRequest ~ getRequest:',
      'getRequest',
    );
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    console.log(
      '🚀 ~ file: gql-auth.guard.ts:19 ~ GqlAuthGuard ~ canActivate ~ canActivate:',
      'canActivate',
    );
    return super.canActivate(context);
  }
}
