import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InitUserInput } from './dtos';
import { LoginService } from './';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => String)
  initUser(@Args('initUserInput') initUserInput: InitUserInput) {
    return this.loginService.initUser(initUserInput);
  }

  @Query(() => String)
  async login() {
    return 'login';
  }
}
