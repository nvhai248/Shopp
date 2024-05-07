import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';
import { LoginInput } from './dto/login.input';
import { GenSalt, HashPW, IsCorrectPW } from 'src/utils/hasher';
import { RegisterInput } from './dto/register.input';
import {
  MyBadRequestException,
  MyUnAuthorizedException,
} from 'src/utils/error';
import { FormatUser } from 'src/utils/formatResult';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { OtpService } from 'src/shared/mailer/otp.service';

const accessTokenSecret = process.env.SECRET_ACCESS_TOKEN_KEY,
  refreshTokenSecret = process.env.SECRET_ACCESS_REFRESH_KEY,
  expired_accessToken = 60 * 60 * 3,
  expired_refreshToken = 60 * 60 * 24 * 30;
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  async validateUserByPayload(payload: JwtPayload): Promise<any> {
    return await this.userRepository.findOneById(payload.userId);
  }

  async validateUserByJwtRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<any> {
    const token = await this.userRepository.findRefreshToken(
      refreshToken,
      userId,
    );

    if (!token) {
      throw new MyUnAuthorizedException(
        'Wrong refresh token, please login again.',
      );
    }
    return;
  }

  async generateJwtToken(
    payload: JwtPayload,
    expiresIn: number,
    secret: string,
  ): Promise<string> {
    const options: JwtSignOptions = {
      expiresIn,
      secret,
    };
    return this.jwtService.sign(payload, options);
  }

  async register(registerInput: RegisterInput): Promise<AuthOutput> {
    try {
      const salt = await GenSalt();
      registerInput.password = await HashPW(registerInput.password, salt);
      const user = await this.userRepository.create(registerInput, salt);
      await this.otpService.generateSecret(user.id);

      const accessToken = await this.generateJwtToken(
        { userId: user.id, role: user.role },
        expired_accessToken,
        accessTokenSecret,
      );

      return {
        accessToken: accessToken,
        expired_accessToken: expired_accessToken,
        refreshToken: null,
        expired_refreshToken: null,
        data: FormatUser(user),
      };
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('email')) {
        throw new MyBadRequestException('Email already exists');
      }
      throw error;
    }
  }

  async login(loginInput: LoginInput): Promise<AuthOutput> {
    const user = await this.userRepository.findOneByEmail(loginInput.email);

    if (!user) {
      throw new MyUnAuthorizedException('Username or password is incorrect!');
    }
    if (!(await IsCorrectPW(user.password, loginInput.password))) {
      throw new MyUnAuthorizedException('Username or password is incorrect!');
    }

    const payload: JwtPayload = { userId: user.id, role: user.role };

    let refreshToken = null;

    if (loginInput.isRememberMe) {
      refreshToken = await this.generateJwtToken(
        payload,
        expired_refreshToken,
        refreshTokenSecret,
      );

      await this.userRepository.createNewRefreshToken(
        refreshToken,
        user.id,
        expired_refreshToken,
      );
    }
    return {
      accessToken: await this.generateJwtToken(
        payload,
        expired_accessToken,
        accessTokenSecret,
      ),
      refreshToken,
      expired_accessToken: expired_accessToken,
      expired_refreshToken: expired_refreshToken,
      data: FormatUser(user),
    };
  }

  async logout(userId: number, refreshToken: string) {
    return (await this.userRepository.deleteRefreshToken(userId, refreshToken))
      ? true
      : false;
  }

  async refreshAccessToken(userId: number, role: string) {
    const payload: JwtPayload = { userId, role };
    const accessToken = await this.generateJwtToken(
      payload,
      expired_accessToken,
      accessTokenSecret,
    );

    return {
      accessToken,
      expired_accessToken: expired_accessToken,
    };
  }
}
