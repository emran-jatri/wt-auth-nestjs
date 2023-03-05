import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { WaterTransportCoreDataServices } from '../../libs';
import { GQLUnauthorizedException } from '../helpers';
import { INVALID_TOKEN } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly waterTransportCoreDataServices: WaterTransportCoreDataServices,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('accessToken.secret'),
    });
  }

  async validate(payload: any) {
    const user = await this.waterTransportCoreDataServices.users.findOneById(
      payload._id,
    );

    if (!user) {
      GQLUnauthorizedException(INVALID_TOKEN);
    }

    return user;
  }
}
