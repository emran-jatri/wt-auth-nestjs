import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginService } from './';
import { InitUserInput } from './dtos';
import { User } from './entities';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => User)
  initUser(@Args('initUserInput') initUserInput: InitUserInput) {
    return this.loginService.initUser(initUserInput);
  }

  @Query(() => String)
  async login() {
    return 'login';
  }
}
