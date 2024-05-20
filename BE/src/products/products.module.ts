import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductRepository } from './product.repository';
import { ProductController } from './products.controller';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  providers: [ProductsResolver, ProductsService, ProductRepository],
  imports: [CategoriesModule],
  controllers: [ProductController],
})
export class ProductsModule {}
