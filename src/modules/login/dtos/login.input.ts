import { InputType, PickType } from '@nestjs/graphql';
import { LoginCommonInput } from './login-common.input';

@InputType()
export class LoginInput extends PickType(LoginCommonInput, [
  'phone',
  'password',
] as const) {}
