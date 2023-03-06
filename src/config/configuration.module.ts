/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDBConfiguration } from './db';
import { EnvConfiguration } from './env';
import { GraphqlModule } from './graphql';
import { JwtConfiguration } from './jwt';
import { SlackConfiguration } from './slack';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        EnvConfiguration,
        MongoDBConfiguration,
        JwtConfiguration,
        SlackConfiguration,
      ],
    }),
  ],
})
export class ConfigurationModule {}
