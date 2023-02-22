import { Module } from '@nestjs/common';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';

@Module({
  imports: [],
  providers: [LoginResolver, LoginService],
  exports: [],
})
export class LoginModule {}
