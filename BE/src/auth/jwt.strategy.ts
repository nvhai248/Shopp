// jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { UnAuthorizedError } from 'src/utils/error';
import { Request } from 'express';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_ACCESS_TOKEN_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserByJwtAccessToken(payload);

    if (!user) {
      throw new UnAuthorizedError('Invalid access token');
    }

    return user;
  }
}
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log(req.cookies['refreshToken']);

          return req.cookies['refreshToken'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_ACCESS_TOKEN_KEY'),
    });
  }

  async validate(payload: JwtPayload, request: Request) {
    const refreshToken = request.cookies['refreshToken'];

    const user = await this.authService.validateUserByJwtRefreshToken(
      payload,
      refreshToken,
    );

    if (!user) {
      throw new UnAuthorizedError('Invalid JWT');
    }

    return user;
  }
}
