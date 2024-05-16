import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createProductInput: CreateProductInput,
    categoryId: number,
    publisherId: number,
    createdBy: number,
  ) {
    try {
      const { name, price, avatar, cover, description } = createProductInput;

      return await this.databaseService.product.create({
        data: {
          name: name,
          price: price,
          priceSale: 0,
          avatar: avatar,
          cover: cover,
          description: description,
          categoryId: categoryId,
          publisherId: publisherId,
          createdBy: createdBy,
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findAll() {
    return await this.databaseService.product.findMany();
  }
}
