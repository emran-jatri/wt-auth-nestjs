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

  @Public()
  @Query(() => LoginEntity)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.loginService.login(loginInput);
  }

  @Public()
  @Query(() => LoginEntity)
  refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ) {
    return this.loginService.refreshToken(refreshTokenInput);
  }

  @Query(() => User)
  getProfile(@CurrentUser() user) {
    return this.loginService.getProfile(user);
  }
}
