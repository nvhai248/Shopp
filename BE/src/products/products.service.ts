import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductRepository } from './product.repository';

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

  async returnSearchProduct(limit: number, page: number) {
    const total = await this.productRepository.count();
    const offset = limit && page ? (page - 1) * limit : 0;
    const products = await this.productRepository.findMany(offset, limit);
    return {
      total: total,
      limit: limit,
      page: page,
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
