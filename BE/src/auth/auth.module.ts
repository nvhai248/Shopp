import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/users/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy, JwtRefreshStrategy } from './jwt.strategy';
import { OtpService } from 'src/shared/otp/otp.service';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'access' }),
    JwtModule.registerAsync({
      useFactory: () => ({}),
    }),
    UsersModule,
  ],
  providers: [
    OtpService,
    AuthResolver,
    AuthService,
    JwtRefreshStrategy,
    JwtAccessStrategy,
    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
