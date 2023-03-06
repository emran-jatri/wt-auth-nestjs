import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../../libs';
import { JwtStrategy } from './../../common';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';

@Module({
  imports: [JwtModule.register({}), UserModule],

  providers: [JwtStrategy, LoginResolver, LoginService],
})
export class LoginModule {}
