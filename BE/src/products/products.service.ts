import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductRepository } from './product.repository';
import { SearchConditionInput } from './dto/serch-condition.input';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductInput: CreateProductInput, createdBy: string) {
    try {
      return await this.productRepository.create(createProductInput, createdBy);
    } catch (error) {
      throw error;
    }
  }

  async returnSearchProduct(conditions: SearchConditionInput) {
    const offset =
      conditions.limit && conditions.page
        ? (conditions.page - 1) * conditions.limit
        : 0;

    const total = await this.productRepository.count(conditions);
    const products = await this.productRepository.findMany(
      offset,
      conditions.limit,
      conditions,
    );
    return {
      total: total,
      limit: conditions.limit,
      page: conditions.page,
      data: products,
    };
  }

  findOne(id: string) {
    return this.productRepository.findOne(id);
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    return this.productRepository.update(id, updateProductInput);
  }
}
