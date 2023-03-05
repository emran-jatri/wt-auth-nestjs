import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginEntity {
  accessToken: string;
  refreshToken: string;
}
