import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';
import { LoginInput } from './dto/login.input';
import { GenSalt, HashPW, IsCorrectPW } from 'src/utils/hasher';
import { RegisterInput } from './dto/register.input';
import { BadRequestError, UnAuthorizedError } from 'src/utils/error';
import { FormatUser } from 'src/utils/formatResult';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    return await this.userRepository.findOneById(payload.userId);
  }

  async generateJwtToken(
    userId: number,
    role: string,
    expired: number = 60 * 60 * 3,
  ): Promise<string> {
    const payload: JwtPayload = { userId: userId, role: role };
    const options: JwtSignOptions = {
      expiresIn: expired,
    };

    const tokenString = this.jwtService.sign(payload, options);
    return tokenString;
  }

  async register(registerInput: RegisterInput) {
    try {
      const salt = await GenSalt();
      registerInput.password = await HashPW(registerInput.password, salt);
      const user = await this.userRepository.create(registerInput, salt);

      return {
        accessToken: await this.generateJwtToken(user.id, user.role),
        refreshToken: await this.generateJwtToken(
          user.id,
          user.role,
          60 * 60 * 24 * 7,
        ),
        expired_accessToken: 60 * 60 * 3,
        expired_refreshToken: 60 * 60 * 24 * 7,
        user: FormatUser(user),
      };
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('email')) {
        throw new BadRequestError('Email already exists');
      }
      throw error;
    }
  }

  async login(loginInput: LoginInput) {
    const user = await this.userRepository.findOneByEmail(loginInput.email);

    if (user && !(await IsCorrectPW(user.password, loginInput.password))) {
      throw new UnAuthorizedError('Username or password is incorrect!');
    }

    return {
      accessToken: await this.generateJwtToken(user.id, user.role),
      refreshToken: await this.generateJwtToken(
        user.id,
        user.role,
        60 * 60 * 24 * 7,
      ),
      expired_accessToken: 60 * 60 * 3,
      expired_refreshToken: 60 * 60 * 24 * 7,
      user: FormatUser(user),
    };
  }
}
