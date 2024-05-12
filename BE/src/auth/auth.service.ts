import { BadRequestException, Injectable } from '@nestjs/common';
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
import { OtpService } from 'src/shared/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { NewThankyouForRegisterEmailOption } from 'src/utils/templateEmail';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUserByPayload(payload: JwtPayload): Promise<any> {
    return await this.userRepository.findOneById(payload.userId);
  }
}
