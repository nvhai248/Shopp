import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { DatabaseService } from 'src/database/database.service';
import { MyBadRequestException } from 'src/utils/error';

@Injectable()
export class OtpService {
  constructor(private readonly databaseService: DatabaseService) {}

  async generateSecret(id: number) {
    const secret = speakeasy.generateSecret({ length: 20 });
    await this.databaseService.user.update({
      where: { id: id },
      data: { secretOtp: secret.base32 },
    });
  }

  async generateOtp(secret: string): Promise<string> {
    const token = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
    }); // Your secret generation logic

    return token;
  }

  verifyOtp(secret: string, otp: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: otp,
      window: 2, // Allowable drift, in seconds
    });
  }
}
