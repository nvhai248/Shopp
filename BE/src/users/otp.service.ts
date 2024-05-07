import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
export class OtpService {
  private otpSecrets: Map<string, { secret: string; createdAt: number }> =
    new Map(); // Store user OTP secrets and creation time

  generateOtp(userId: string): string {
    const secret = speakeasy.generateSecret({ length: 20 });
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
    }); // Your secret generation logic
    this.otpSecrets.set(userId, {
      secret: secret.base32,
      createdAt: Date.now(),
    });

    return token;
  }

  verifyOtp(
    userId: string,
    otp: string,
    otpValidityDuration: number = 300000,
  ): boolean {
    const secretData = this.otpSecrets.get(userId);

    if (!secretData) {
      throw new Error('User not found or secret expired');
    }

    // Check if the OTP is expired
    if (Date.now() - secretData.createdAt > otpValidityDuration) {
      throw new Error('OTP expired');
    }

    const verified = speakeasy.totp.verify({
      secret: secretData.secret,
      encoding: 'base32',
      token: otp,
      window: 2, // Allowable drift, in seconds
    });

    return verified;
  }
}
