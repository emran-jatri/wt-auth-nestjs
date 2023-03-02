import { Injectable } from '@nestjs/common';
import { UserService } from '../../libs';
import { InitUserInput, LoginInput } from './dtos';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  initUser(initUserInput: InitUserInput) {
    return this.userService.init(initUserInput);
  }

  async login(loginInput: LoginInput) {
    console.log(this.configService.get('accessToken.secret'));
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { name: 'Emran' },
        {
          secret: this.configService.get('accessToken.secret'),
          expiresIn: this.configService.get('accessToken.expireIn'),
        },
      ),
      this.jwtService.signAsync(
        { _id: '132412534' },
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

    return 'responsePayload';
  }
}
