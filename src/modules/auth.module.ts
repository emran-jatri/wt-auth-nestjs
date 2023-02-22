import { Module } from '@nestjs/common';
import { LoginModule } from './login';

@Module({
  imports: [LoginModule],
  exports: [LoginModule],
})
export class AuthModule {}
