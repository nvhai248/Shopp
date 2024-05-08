import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { MyBadRequestException, MyDBException } from 'src/utils/error';
import { UserRepository } from './user.repository';
import { unmaskId } from 'src/utils/mask';
import { DB_TYPES, USER_STATUS, GenKey, TYPE_KEY } from 'src/utils/const';
import { FormatUser } from 'src/utils/formatResult';
import { OtpService } from '../shared/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import {
  NewRefreshPasswordEmailOption,
  NewVerificationEmailOption,
} from 'src/utils/templateEmail';
import { MyNotFoundException } from 'src/utils/error';
import { CacheService } from 'src/database/cache.service';
import { maskId } from 'src/utils/mask';
import { HashPW } from 'src/utils/hasher';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
    private readonly cacheService: CacheService,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneById(
        typeof id == 'number' ? id : unmaskId(id, DB_TYPES.USER),
      );

      if (!user) {
        throw new MyDBException('User not found');
      }

      return FormatUser(user);
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneByEmail(email);

      if (!user) {
        throw new MyDBException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.updateOne(id, updateUserInput);

    return FormatUser(user);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async updateUserStatus(id: number, status: number) {
    await this.userRepository.updateOne(id, { status: status });
  }

  async requireSendEmailVerifyUser(
    userEmail: string,
    userName: string,
    userSecretOtp: string,
  ): Promise<boolean> {
    const otp = await this.otpService.generateOtp(userSecretOtp);

    // Send the OTP to the user via email
    this.mailerService
      .sendMail(NewVerificationEmailOption(userEmail, userName, otp))
      .catch((err) => {
        console.log(err);
      });

    return true;
  }

  async verifyUser(
    userId: number,
    userSecretOtp: string,
    otp: string,
  ): Promise<Boolean> {
    // Verify OTP entered by the user
    const otpIsValid = this.otpService.verifyOtp(userSecretOtp, otp);

    if (otpIsValid) {
      await this.userRepository.updateOne(userId, {
        status: USER_STATUS.ACTIVE,
      });
    }

    return otpIsValid;
  }

  async requireSendEmailResetPassword(email: string) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new MyNotFoundException('User not found!');
    }

    const token = Date.now() % 100000;

    await this.cacheService.set(
      GenKey(user.id, TYPE_KEY.REFRESH_PASSWORD),
      token,
      {
        ttl: 1000 * 60 * 30,
      },
    ); // expired in 1 minutes

    this.mailerService
      .sendMail(
        NewRefreshPasswordEmailOption(
          user.email,
          user.name,
          maskId(user.id, DB_TYPES.USER),
          token,
        ),
      )
      .catch((err) => console.log(err));
    return true;
  }

  async refreshUserPassword(
    userId: string,
    token: string,
    password: string,
  ): Promise<boolean> {
    const id = unmaskId(userId, DB_TYPES.USER);
    const systemToken = await this.cacheService.get(
      GenKey(id, TYPE_KEY.REFRESH_PASSWORD),
    );

    if (token === systemToken) {
      throw new MyBadRequestException('Your token is expired or invalid.');
    }

    const user = await this.userRepository.findOneById(id);

    const hashPw = await HashPW(password, user.salt);

    await this.userRepository.updateOne(id, { password: hashPw });
    return true;
  }

  getUserCart(id: string) {
    const products = [];

    return products;
  }
}
