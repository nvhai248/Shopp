import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CurrentUser, JwtAdminAuthGuard } from 'src/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { PagingProduct } from './entities/paging-product.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @UseGuards(JwtAdminAuthGuard)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUser() user: any,
  ) {
    return this.productsService.create(createProductInput, user.id);
  }

  @Query(() => PagingProduct, { name: 'products' })
  search(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Int, nullable: true }) limit: number = 10,
  ) {
    return this.productsService.returnSearchProduct(limit, page);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminAuthGuard)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }
}
