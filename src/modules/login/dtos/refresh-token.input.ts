import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
