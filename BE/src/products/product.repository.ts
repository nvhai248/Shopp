import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createProductInput: CreateProductInput,
    categoryId: string,
    publisherId: string,
    createdBy: string,
  ) {
    try {
      const { name, price, avatar, images, description } = createProductInput;

      return await this.databaseService.product.create({
        data: {
          name: name,
          price: price,
          priceSale: 0,
          avatar: avatar,
          images: images,
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
