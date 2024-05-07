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
import { OtpService } from '../shared/mailer/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { NewVerificationEmailOption } from 'src/utils/templateEmail';
import { TYPE_KEY, USER_STATUS } from 'src/utils/const';
import { MyNotFoundException } from 'src/utils/error';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async requireSendEmailVerifyUser(@CurrentUser() user: any): Promise<boolean> {
    const otp = await this.otpService.generateOtp(
      user.id,
      user.secretOtp,
      TYPE_KEY.VERIFY,
    );

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
    @CurrentUser() user: any,
    @Args('otp') otp: string,
  ): Promise<Boolean> {
    // Verify OTP entered by the user
    const otpIsValid = this.otpService.verifyOtp(
      user.id,
      user.secretOtp,
      otp,
      TYPE_KEY.VERIFY,
    );

    if (otpIsValid) {
      await this.usersService.updateUserStatus(
        parseInt(user.id),
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

  @Mutation(() => Boolean)
  async requireSendEmailResetPassword(@Args('email') email: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new MyNotFoundException('User not found!');
    }

    /* this.mailerService.sendMail().catch((err) => console.log(err)); */
    return true;
  }
}
