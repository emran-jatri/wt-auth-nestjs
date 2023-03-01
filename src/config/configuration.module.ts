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

const statusCodePlugin: ApolloServerPlugin = {
  async requestDidStart(requestContext) {
    return {
      async willSendResponse(requestContext) {
        const errors = (requestContext?.response?.errors || []) as any[];
        // console.log(errors);
        for (const err of errors) {
          requestContext.response.http.status = err?.statusCode;
        }
      },
    };
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration, MongoDBConfiguration],
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
      // formatError: (err) => {
      //   const { code, status } = err.extensions;
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   const message = err?.extensions?.response?.message || err.message;
      //   const errStatus =
      //     // @ts-ignore
      //     err?.extensions?.response?.statusCode || status || 400;
      //   return {
      //     statusCode: errStatus,
      //     code,
      //     message:
      //       Array.isArray(message) && message.length > 0
      //         ? message.join(', ')
      //         : message,
      //     path: err.path,
      //   };
      // },

      formatError: (error: GraphQLError) => {
        // remove exception details
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { exception: _, ...extensions } = error.extensions;
        console.log(
          '🚀 ~ file: configuration.module.ts:66 ~ extensions:',
          extensions,
        );

        // return <GraphQLFormattedError>{
        //   message: error.message,
        //   extensions: extensions,
        //   locations: error.locations,
        //   path: error.path,
        // };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = extensions?.response?.message || error.message;
        return <GraphQLFormattedError>{
          extensions,
          message,
        };
      },
    }),
  ],
})
export class ConfigurationModule {}
