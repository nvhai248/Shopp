import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository'; // Ensure the path to your CartsRepository is correct

@Injectable()
export class CartsService {
  constructor(private readonly cartsRepository: CartsRepository) {}

  async addProductToCart(
    productId: string,
    userId: string,
    quantity: number,
  ): Promise<boolean> {
    return (await this.cartsRepository.addProductToCart(
      productId,
      userId,
      quantity,
    ))
      ? true
      : false;
  }

  async getCart(userId: string): Promise<any> {
    return await this.cartsRepository.getCart(userId);
  }

  async updateProductQuantity(
    productId: string,
    userId: string,
    quantity: number,
  ): Promise<boolean> {
    return await this.cartsRepository.updateProductQuantity(
      productId,
      userId,
      quantity,
    );
  }

  async removeProductFromCart(
    productId: string,
    userId: string,
  ): Promise<boolean> {
    return await this.cartsRepository.removeProductFromCart(productId, userId);
  }

  async clearCart(userId: string): Promise<boolean> {
    return await this.cartsRepository.clearCart(userId);
  }
}
