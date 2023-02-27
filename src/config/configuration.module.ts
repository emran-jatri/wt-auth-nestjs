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
    }),
  ],
  // exports: [
  //   ConfigModule.forRoot({
  //     load: [EnvConfiguration, MongoDBConfiguration],
  //   }),
  //   GraphQLModule.forRoot<ApolloDriverConfig>({
  //     driver: ApolloDriver,
  //     autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  //     playground: false,
  //     plugins: [ApolloServerPluginLandingPageLocalDefault()],
  //   }),
  // ],
})
export class ConfigurationModule {}
