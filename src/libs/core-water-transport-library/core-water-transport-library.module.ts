import { Module } from '@nestjs/common';
import { MongoDBModule } from './repository';
import { CoreWaterTransportServiceModule } from './services';

@Module({
  imports: [MongoDBModule, CoreWaterTransportServiceModule],
  exports: [MongoDBModule, CoreWaterTransportServiceModule],
})
export class CoreWaterTransportLibraryModule {}
