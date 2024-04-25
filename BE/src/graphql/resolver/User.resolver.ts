import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { UseGuards } from '@nestjs/common';
import { LocalGuard } from '../guards/local.guard';
import { ProductInCart } from '../models/ProductInCart';
import { UserMockData } from 'src/mockData/User';
import { ProductInCartsMockData } from 'src/mockData/ProductInCart';
import { of } from 'rxjs';
import { UserCreateArgs } from '../args/User.args';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  @UseGuards(LocalGuard)
  getUserById(@Args('id') id: string) {
    return UserMockData.find((user) => user.id === id);
  }

  @Query(() => [User])
  listUser() {
    return UserMockData;
  }

  @ResolveField((returns) => [ProductInCart], { name: 'cart' })
  getUserCart(@Parent() user: User) {
    const products = [];
    ProductInCartsMockData.forEach((product) => {
      if (product.userId === user.id) {
        products.push(product);
      }
    });
    return products;
  }

  @Mutation((returns) => User)
  createNewUser(@Args() userCreateArgs: UserCreateArgs) {
    return {
      id: 'stringAtt',
      name: userCreateArgs.name,
      email: userCreateArgs.email,
      birthDate: userCreateArgs.birthDate,
      address: userCreateArgs.address,
    };
  }
}
