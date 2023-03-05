import { GraphQLError } from 'graphql/error';
import { HttpStatus } from '@nestjs/common';

export function GQLBadRequestException(message) {
  throw new GraphQLError(message, {
    extensions: {
      status: HttpStatus.BAD_REQUEST,
      statusCode: HttpStatus.BAD_REQUEST,
      code: 'BAD_REQUEST',
    },
  });
}

export function GQLNotFoundException(message) {
  throw new GraphQLError(message, {
    extensions: {
      status: HttpStatus.NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
      code: 'NOT_FOUND_REQUEST',
    },
  });
}

export function GQLForbiddenException(message) {
  throw new GraphQLError(message, {
    extensions: {
      status: HttpStatus.FORBIDDEN,
      statusCode: HttpStatus.FORBIDDEN,
      code: 'FORBIDDEN',
    },
  });
}

export function GQLUnauthorizedException(message) {
  throw new GraphQLError(message, {
    extensions: {
      status: HttpStatus.UNAUTHORIZED,
      statusCode: HttpStatus.UNAUTHORIZED,
      code: 'UNAUTHORIZED',
    },
  });
}
