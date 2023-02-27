import { Module } from '@nestjs/common';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';
import { UserModule } from '../../libs';

@Module({
  imports: [UserModule],
  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
