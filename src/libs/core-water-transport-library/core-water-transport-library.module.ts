import { Module } from '@nestjs/common';
import { MongoDBModule } from './repository';

@Module({
  imports: [MongoDBModule],
  exports: [MongoDBModule],
})
export class CoreWaterTransportLibraryModule {}
