import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard, PermissionGuard, RoleGuard, TrimPipe } from './common';
import { ConfigurationModule, GraphqlModule } from './config';
import { CoreWaterTransportLibraryModule } from './libs';
import { AuthModule } from './modules';
@Module({
  imports: [
    ConfigurationModule,
    GraphqlModule,
    PassportModule,
    CoreWaterTransportLibraryModule,
    AuthModule,
  ],
  providers: [
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
    {
      provide: APP_PIPE,
      useClass: TrimPipe,
    },
  ],
})
export class AppModule {}
