import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config';
import { AuthModule } from './modules';
import { CoreWaterTransportLibraryModule } from './libs';
@Module({
  imports: [ConfigurationModule, CoreWaterTransportLibraryModule, AuthModule],
})
export class AppModule {}
