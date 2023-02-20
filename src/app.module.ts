import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration, MongoDBConfiguration } from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [EnvConfiguration, MongoDBConfiguration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
