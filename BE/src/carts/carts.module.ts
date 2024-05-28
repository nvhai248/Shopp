import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { CartsRepository } from './carts.repository';

@Module({
  providers: [CartsResolver, CartsService, CartsRepository],
})
export class CartsModule {}
