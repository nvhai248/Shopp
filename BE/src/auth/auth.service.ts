import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';
import { LoginInput } from './dto/login.input';
import { ComparePW, GenSalt, HashPW } from 'src/utils/salt';
import { RegisterInput } from './dto/register.input';
import { BadRequestError, UnAuthorizedError } from 'src/utils/error';
import { FormatUser } from 'src/utils/formatResult';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(accessToken: string): Promise<any> {
    return true;
  }

  async register(registerInput: RegisterInput) {
    try {
      const salt = await GenSalt();
      registerInput.password = await HashPW(registerInput.password, salt);
      const user = await this.userRepository.create(registerInput, salt);

      return {
        user: FormatUser(user),
        accessToken: 'jwt-at',
        refreshToken: 'jwt-rt',
        expired: 60000,
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

    if (user && !ComparePW(user.password, loginInput.password)) {
      throw new UnAuthorizedError('Username or password is incorrect!');
    }

    return {
      user: FormatUser(user),
      accessToken: 'jwt-at',
      refreshToken: 'jwt-rt',
      expired: 60000,
    };
  }
}
