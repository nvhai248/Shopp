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
import { UpdateUserInput } from './dto/update-user.input';
import { Cart } from 'src/carts/entities/cart.entity';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAccessAuthGuard } from 'src/guard/jwt-auth.guard';
import { RequireActiveGuard } from 'src/guard/require-active.guard';
import { OtpService } from './otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { NewVerificationEmailOption } from 'src/utils/templateEmail';
import { USER_STATUS } from 'src/utils/const';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async requireSendEmailVerifyUser(
    @CurrentUser() user: User,
  ): Promise<boolean> {
    const id = user.id;

    const otp = this.otpService.generateOtp(id);

    // Send the OTP to the user via email
    this.mailerService
      .sendMail(NewVerificationEmailOption(user.email, user.name, otp))
      .catch((err) => {
        console.log(err);
      });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async verifyUser(
    @CurrentUser() user: User,
    @Args('otp') otp: string,
  ): Promise<Boolean> {
    const id = user.id;

    // Verify OTP entered by the user
    const otpIsValid = this.otpService.verifyOtp(id, otp);

    if (otpIsValid) {
      await this.usersService.updateUserStatus(
        parseInt(id),
        USER_STATUS.ACTIVE,
      );
    }

    return otpIsValid;
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
}
