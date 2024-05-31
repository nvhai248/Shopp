import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import {
  CurrentUser,
  JwtAccessAuthGuard,
  JwtAdminAuthGuard,
} from 'src/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUserInterface } from 'src/interfaces';
import { PagingOrderInput } from './dto/paging-order.input';
import { PagingOrderResponse } from './entities/paging-order.entity';
import { OrderItem } from './entities/order-item.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  @UseGuards(JwtAccessAuthGuard)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.ordersService.create(createOrderInput, user.id);
  }

  @Query(() => [PagingOrderResponse], { name: 'orders' })
  @UseGuards(JwtAdminAuthGuard)
  findAll(@Args('pagingOrderInput') pagingOrderInput: PagingOrderInput) {
    return this.ordersService.findMany(pagingOrderInput);
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Query(() => [PagingOrderResponse], { name: 'historiesOrder' })
  @UseGuards(JwtAccessAuthGuard)
  historyOrder(
    @Args('pagingOrderInput') pagingOrderInput: PagingOrderInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.ordersService.findMany(pagingOrderInput, user.id);
  }

  @ResolveField((returns) => [OrderItem], { name: 'items' })
  findItems(@Parent() parent: Order) {
    return this.ordersService.findItems(parent.id);
  }
}
