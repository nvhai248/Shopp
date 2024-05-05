import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  JwtAccessAuthGuard,
  JwtRefreshAuthGuard,
} from 'src/guard/jwt-auth.guard';
import { LogoutResponse } from './entities/logout.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const result = await this.authService.login(loginInput);

    return result;
  }

  @Mutation(() => AuthResponse)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Mutation(() => LogoutResponse)
  async logout(@CurrentUser() user: any) {
    return { result: await this.authService.logout(user.id) };
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Mutation(() => AuthResponse)
  refreshAccessToken(@CurrentUser() user: any) {
    return this.authService.refreshAccessToken(user.id, user.role);
  }
}
