/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { MongoDBConfiguration } from './db';
import { EnvConfiguration } from './env';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { JwtConfiguration } from './jwt';

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
    ConfigModule.forRoot({
      load: [EnvConfiguration, MongoDBConfiguration, JwtConfiguration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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

        const status = extensions?.code;
        // @ts-ignore
        const statusCode = extensions?.response?.statusCode ?? 500;

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
export class ConfigurationModule {}
