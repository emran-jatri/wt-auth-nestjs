import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginService } from './';
import { InitUserInput, LoginInput } from './dtos';
import { User } from './entities';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => User)
  initUser(@Args('initUserInput') initUserInput: InitUserInput) {
    // throw new GraphQLError('Something went wrong!', {
    //   extensions: {
    //     statusCode: 401,
    //   },
    // });
    return this.loginService.initUser(initUserInput);
  }

  @Query(() => String)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.loginService.login(loginInput);
  }
}
