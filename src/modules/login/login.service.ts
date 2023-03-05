import {
  GQLBadRequestException,
  GQLNotFoundException,
  INVALID_USERNAME_OR_PASSWORD,
  USER_NOT_FOUND,
} from './../../common';
import { Injectable } from '@nestjs/common';
import { UserService, WaterTransportCoreDataServices } from '../../libs';
import { InitUserInput, LoginInput, RefreshTokenInput } from './dtos';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly waterTransportCoreDataServices: WaterTransportCoreDataServices,
  ) {}

  initUser(initUserInput: InitUserInput) {
    return this.userService.init(initUserInput);
  }

  async login(loginInput: LoginInput) {
    const { phone, password } = loginInput;

    const user = await this.waterTransportCoreDataServices.users.findOne({
      filter: {
        phone,
      },
    });

    if (!user) {
      GQLNotFoundException(USER_NOT_FOUND);
    }

    const passwordVerified = await argon2.verify(user.password, password);

    if (!passwordVerified) {
      GQLBadRequestException(INVALID_USERNAME_OR_PASSWORD);
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { _id: user._id },
        {
          secret: this.configService.get('accessToken.secret'),
          expiresIn: this.configService.get('accessToken.expireIn'),
        },
      ),
      this.jwtService.signAsync(
        { _id: user._id },
        {
          secret: this.configService.get('refreshToken.secret'),
          expiresIn: this.configService.get('refreshToken.expireIn'),
        },
      ),
    ]);

    const responsePayload = {
      accessToken,
      refreshToken,
    };

    return responsePayload;
  }

  async refreshToken(refreshTokenInput: RefreshTokenInput) {
    // const { refreshToken: token } = refreshTokenInput;

    // const user = await this.waterTransportCoreDataServices.users.findOneById();

    // if (!user) {
    //   GQLNotFoundException(USER_NOT_FOUND);
    // }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { _id: 'lkjasdlfkjklajsdf' },
        {
          secret: this.configService.get('accessToken.secret'),
          expiresIn: this.configService.get('accessToken.expireIn'),
        },
      ),
      this.jwtService.signAsync(
        { _id: 'lkjasdlfkjklajsdf' },
        {
          secret: this.configService.get('refreshToken.secret'),
          expiresIn: this.configService.get('refreshToken.expireIn'),
        },
      ),
    ]);

    const responsePayload = {
      accessToken,
      refreshToken,
    };
    return responsePayload;
  }
}
