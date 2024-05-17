import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductRepository } from './product.repository';
import { unmaskId } from 'src/utils/mask';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductInput: CreateProductInput, createdBy: string) {
    try {
      const categoryId = createProductInput.categoryId
        ? createProductInput.categoryId
        : '1';
      const publisherId = createProductInput.publisherId
        ? createProductInput.publisherId
        : '1';
      return await this.productRepository.create(
        createProductInput,
        categoryId,
        publisherId,
        createdBy,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
