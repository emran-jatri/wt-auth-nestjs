import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { MongoDBConfiguration } from './db';
import { EnvConfiguration } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration, MongoDBConfiguration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      cache: 'bounded',
      introspection: true,
      formatResponse: (res, ctx) => {
        return {
          ...res,
        };
      },
      formatError: (err) => {
        const { code, status } = err.extensions;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = err?.extensions?.response?.message || err.message;
        // @ts-ignore
        const errStatus = err?.extensions?.response?.statusCode || status || 400;
        return {
          status: errStatus,
          code,
          message:
            Array.isArray(message) && message.length > 0
              ? message.join(', ')
              : message,
          path: err.path,
        };
      },
    }),
  ],
})
export class ConfigurationModule {}
