import { Module } from '@nestjs/common';
import { UserModule } from './users';

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class CoreWaterTransportServiceModule {}
