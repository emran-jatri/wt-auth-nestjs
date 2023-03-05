/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';

const statusCodePlugin: ApolloServerPlugin = {
  async requestDidStart(requestContext) {
    return {
      async willSendResponse(requestContext) {
        const errors = (requestContext?.response?.errors || []) as any[];
        if (errors.length) {
          requestContext.response.http.status = errors[0]?.statusCode;
        }
      },
    };
  },
};

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/config/graphql/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault(), statusCodePlugin],
      cache: 'bounded',
      introspection: true,
      formatResponse: (res, ctx) => {
        return {
          ...res,
        };
      },

      formatError: (error: GraphQLError) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { exception: _, ...extensions } = error.extensions;
        console.log('🚀 ~ file: graphql.module.ts:41 ~ exception:', _);
        console.log('🚀 ~ file: graphql.module.ts:64 ~ error:', error);
        console.log(
          '🚀 ~ file: graphql.module.ts:41 ~ extensions:',
          extensions,
        );

        const status = extensions?.code;
        const statusCode =
          // @ts-ignore
          extensions?.response?.statusCode || extensions?.statusCode || 500;

        // @ts-ignore
        let message = extensions?.response?.message || error?.message;
        message =
          Array.isArray(message) && message.length > 0
            ? message.join(', ')
            : message;

        const path = error.path ?? null;

        return <GraphQLFormattedError>{
          status,
          statusCode,
          message,
          path,
        };
      },
    }),
  ],
})
export class GraphqlModule {}
