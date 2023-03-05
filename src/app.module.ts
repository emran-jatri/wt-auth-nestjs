import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import {
  JwtAuthGuard,
  JwtStrategy,
  PermissionGuard,
  RoleGuard,
} from './common';
import { ConfigurationModule } from './config';
import { CoreWaterTransportLibraryModule } from './libs';
import { AuthModule } from './modules';
@Module({
  imports: [
    ConfigurationModule,
    PassportModule,
    CoreWaterTransportLibraryModule,
    AuthModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
