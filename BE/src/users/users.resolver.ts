import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
  Context,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Cart } from 'src/carts/entities/cart.entity';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAccessAuthGuard } from 'src/guard/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
  @UseGuards(JwtAccessAuthGuard)
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
