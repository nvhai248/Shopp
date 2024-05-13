import { Injectable } from '@nestjs/common';

@Injectable()
export class CartsService {
  addProductToCart(productId: string, quantity: number) {
    return {
      productId: productId,
      quantity: quantity,
    };
  }
}
