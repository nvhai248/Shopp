import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { of } from 'rxjs';
import { ProductInCart } from '../models/ProductInCart';
import { AddProductArgs } from '../args/Product.args';

@Resolver((of) => ProductInCart)
export class ProductInCartResolver {
  @Mutation((returns) => ProductInCart)
  addProductToCart(@Args() addProductArgs: AddProductArgs) {
    return {
      productId: addProductArgs.productId,
      quantity: addProductArgs.quantity,
    };
  }
}
