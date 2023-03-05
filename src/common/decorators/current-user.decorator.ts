import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    console.log(
      '🚀 ~ file: current-user.decorator.ts:8 ~ ctx.getContext().req.user:',
      ctx.getContext().req.user,
    );
    return ctx.getContext().req.user;
  },
);
