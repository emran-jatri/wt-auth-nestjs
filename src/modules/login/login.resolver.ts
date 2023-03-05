import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginService } from './';
import { InitUserInput, LoginInput, RefreshTokenInput } from './dtos';
import { LoginEntity, User } from './entities';
import { CurrentUser, Public } from '../../common';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => User)
  initUser(@Args('initUserInput') initUserInput: InitUserInput) {
    return this.loginService.initUser(initUserInput);
  }

  // @Public()
  @Query(() => LoginEntity)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.loginService.login(loginInput);
  }

  @Query(() => String)
  refreshToken(
    // @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
    @CurrentUser() user,
  ) {
    console.log(
      '🚀 ~ file: login.resolver.ts:27 ~ LoginResolver ~ user:',
      user,
    );
    return 'lkjasdlfkjlkjasdf';
    // return this.loginService.refreshToken();
  }
}
