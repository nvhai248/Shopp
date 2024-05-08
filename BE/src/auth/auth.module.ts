import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/users/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy, JwtRefreshStrategy } from './jwt.strategy';
import { OtpService } from 'src/shared/otp/otp.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'access' }),
    JwtModule.registerAsync({
      useFactory: () => ({}),
    }),
  ],
  providers: [
    OtpService,
    AuthResolver,
    AuthService,
    UserRepository,
    JwtRefreshStrategy,
    JwtAccessStrategy,
  ],
})
export class AuthModule {}
