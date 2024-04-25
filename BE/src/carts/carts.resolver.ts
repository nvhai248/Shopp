import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { AddProductInput } from './dto/cart.input';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Mutation((returns) => Cart)
  addProductToCart(@Args() addProductInput: AddProductInput) {
    return this.cartsService.addProductToCart(
      addProductInput.productId,
      addProductInput.quantity,
    );
  }
}
