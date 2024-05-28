import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { AddProductInput } from './dto/cart.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAccessAuthGuard } from 'src/guard/jwt-auth.guard';
import { CurrentUserInterface } from 'src/interfaces';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async addProductToCart(
    @Args('addProductInput') addProductInput: AddProductInput,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<boolean> {
    return await this.cartsService.addProductToCart(
      addProductInput.productId,
      user.id,
      addProductInput.quantity,
    );
  }

  @Query(() => Cart)
  @UseGuards(JwtAccessAuthGuard)
  async getCart(@CurrentUser() user: CurrentUserInterface): Promise<boolean> {
    return this.cartsService.getCart(user.id);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAccessAuthGuard)
  async updateProductQuantity(
    @Args('updateProductQuantityInput')
    updateProductQuantityInput: AddProductInput,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<boolean> {
    await this.cartsService.updateProductQuantity(
      updateProductQuantityInput.productId,
      user.id,
      updateProductQuantityInput.quantity,
    );
    return this.cartsService.getCart(user.id);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAccessAuthGuard)
  async removeProductFromCart(
    @Args('productId') productId: string,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<boolean> {
    await this.cartsService.removeProductFromCart(productId, user.id);
    return this.cartsService.getCart(user.id);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAccessAuthGuard)
  async clearCart(@CurrentUser() user: CurrentUserInterface): Promise<boolean> {
    await this.cartsService.clearCart(user.id);
    return this.cartsService.getCart(user.id);
  }
}
