import { JwtStrategy } from './../../common';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../../libs';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule.register({}), UserModule],

  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
