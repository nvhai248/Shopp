import { BadRequestException, Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { CacheService } from 'src/database/cache.service';
import { DatabaseService } from 'src/database/database.service';

function genKey(userId: number, typeKey: string): string {
  return `${userId}:${typeKey}`;
}

@Injectable()
export class OtpService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cacheService: CacheService,
  ) {}

  async generateSecret(id: number) {
    const secret = speakeasy.generateSecret({ length: 20 });
    await this.databaseService.user.update({
      where: { id: id },
      data: { secretOtp: secret.base32 },
    });
  }

  async generateOtp(
    userId: number,
    secret: string,
    type: string,
  ): Promise<string> {
    const token = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
    }); // Your secret generation logic

    await this.cacheService.set(`${genKey(userId, type)}`, token, {
      ttl: 1000 * 60 * 60,
    });

    return token;
  }

  async verifyOtp(
    userId: number,
    secret: string,
    otp: string,
    type: string,
  ): Promise<boolean> {
    const isNotExpired = await this.cacheService.get(genKey(userId, type));

    if (!isNotExpired) {
      throw new BadRequestException('Expired credentials!');
    }

    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: otp,
      window: 2, // Allowable drift, in seconds
    });
  }
}
