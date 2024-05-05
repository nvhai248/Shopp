// jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { UnAuthorizedError } from 'src/utils/error';
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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_ACCESS_REFRESH_KEY'),
    });
  }

  async validate(payload: JwtPayload, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Retrieve the refresh token from the request headers
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnAuthorizedError('Invalid authorization header');
    }

    const refreshToken = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!refreshToken) {
      throw new UnAuthorizedError('No refresh token provided');
    }

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
