import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config';
import { AuthModule } from './modules';
@Module({
  imports: [ConfigurationModule, AuthModule],
})
export class AppModule {}
