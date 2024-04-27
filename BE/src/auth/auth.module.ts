import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [PassportModule],
  providers: [AuthResolver, AuthService, LocalStrategy, UserRepository],
})
export class AuthModule {}
