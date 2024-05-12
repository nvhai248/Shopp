import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/users/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './jwt.strategy';
import { OtpService } from 'src/shared/otp/otp.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({}),
    }),
  ],
  providers: [
    OtpService,
    AuthService,
    UserRepository,
    JwtAccessStrategy,
    GoogleStrategy,
  ],
  controllers: [],
})
export class AuthModule {}
