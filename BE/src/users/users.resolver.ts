import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/updateUser.input';
import { Cart } from 'src/carts/entities/cart.entity';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAccessAuthGuard } from 'src/guard/jwt-auth.guard';
import { RequireActiveGuard } from 'src/guard/require-active.guard';
import { UserRefreshPasswordInput } from './dto/refreshPw.input';
import { ChangePasswordInput } from './dto/changePw.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async requireSendEmailVerifyUser(@CurrentUser() user: any): Promise<boolean> {
    return this.usersService.requireSendEmailVerifyUser(
      user.email,
      user.name,
      user.secretOtp,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async verifyUser(
    @CurrentUser() user: any,
    @Args('otp') otp: string,
  ): Promise<Boolean> {
    // Verify OTP entered by the user
    return this.usersService.verifyUser(user.id, user.secretOtp, otp);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User)
  @UseGuards(JwtAccessAuthGuard)
  getProfile(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  updateProfile(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: any,
  ) {
    return this.usersService.update(user.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  @ResolveField((returns) => [Cart], { name: 'cart' })
  getUserCart(@Parent() user: User) {
    return this.usersService.getUserCart(user.id);
  }

  @Mutation(() => Boolean)
  async requireSendEmailResetPassword(@Args('email') email: string) {
    return this.usersService.requireSendEmailResetPassword(email);
  }

  @Mutation(() => Boolean)
  async refreshUserPassword(
    @Args('userRefreshPasswordInput') data: UserRefreshPasswordInput,
  ) {
    return this.usersService.refreshUserPassword(
      data.id,
      data.token,
      data.password,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async changePassword(
    @CurrentUser() user: any,
    @Args('changePasswordInput') dto: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(
      user.id,
      dto.currentPassword,
      dto.newPassword,
    );
  }
}
