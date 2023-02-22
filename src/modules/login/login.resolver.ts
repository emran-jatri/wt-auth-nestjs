import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class LoginResolver {
  // constructor() {}

  @Query(() => String)
  async login() {
    return 'login';
  }
}
