import { ConfigurationModule, JwtConfiguration } from './../../config';
import { Module } from '@nestjs/common';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';
import { UserModule } from '../../libs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [JwtConfiguration],
    }),
    JwtModule.register({}),
    UserModule,
  ],
  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
