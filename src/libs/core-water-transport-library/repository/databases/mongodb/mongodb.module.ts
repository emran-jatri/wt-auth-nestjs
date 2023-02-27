import { Global, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as uniqueValidator from 'mongoose-unique-validator';
import { User, UserSchema } from '../../schemas';
import { MongoDBDataServices } from './mongodb-data.service';
import { WaterTransportCoreDataServices } from '../../abstracts';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoDBConnectionString'),
        connectionFactory: (connection) => {
          const logger = new Logger('MongoDBModule', { timestamp: true });
          if (connection.readyState === 1) {
            logger.log(
              '=======================================> MongoDB connected',
            );
          }

          connection.on('disconnected', () => {
            logger.log(
              '=======================================> MongoDB disconnected',
            );
          });
          connection.on('error', (error) => {
            logger.log(
              '=======================================> DB connection failed! for error: ',
              error,
            );
          });

          connection.plugin(mongoosePaginate);
          connection.plugin(uniqueValidator, {
            message: '{PATH} must be unique',
          });
          return connection;
        },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: WaterTransportCoreDataServices,
      useClass: MongoDBDataServices,
    },
  ],
  exports: [WaterTransportCoreDataServices],
})
export class MongoDBModule {}
