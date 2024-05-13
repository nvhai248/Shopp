import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductRepository } from './product.repository';

@Module({
  providers: [ProductsResolver, ProductsService, ProductRepository],
})
export class ProductsModule {}
