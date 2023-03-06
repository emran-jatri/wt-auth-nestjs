/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { SlackModule, SlackService } from '../../common';

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
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [SlackModule],
      inject: [SlackService],
      useFactory: (slackService: SlackService) => ({
        autoSchemaFile: join(process.cwd(), 'src/config/graphql/schema.gql'),
        playground: false,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault(),
          statusCodePlugin,
        ],
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

          const errorResponse = {
            status,
            statusCode,
            message,
            path,
          };
          slackService.sendTextMessage(JSON.stringify(errorResponse));

          return <GraphQLFormattedError>{ ...errorResponse };
        },
      }),
    }),
  ],
})
export class GraphqlModule {}
