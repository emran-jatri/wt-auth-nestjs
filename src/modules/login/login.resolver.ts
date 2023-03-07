import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginService } from './';
import { InitUserInput, LoginInput, RefreshTokenInput } from './dtos';
import { LoginEntity, User } from './entities';
import { CurrentUser, Permissions, Public, Roles } from '../../common';
import { PermissionEnum, RoleEnum } from '../../libs';

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

  // @Permissions(PermissionEnum.GHAT_READ)
  // @Roles(RoleEnum.SUPERVISOR)
  @Query(() => User)
  getProfile(@CurrentUser() user) {
    return this.loginService.getProfile(user);
  }
}
