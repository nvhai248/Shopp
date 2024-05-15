import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { CreateProductInput } from './dto/create-product.input';
import { PRODUCT_TYPE } from 'src/utils/const';

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createProductInput: CreateProductInput,
    categoryId: number,
    brandId: number,
    createdBy: number,
  ) {
    try {
      const { name, price, types, avatar, cover } = createProductInput;

      return await this.databaseService.product.create({
        data: {
          name: name,
          price: price,
          priceSale: 0,
          types: types,
          avatar: avatar,
          cover: cover,
          categoryId: categoryId,
          brandId: brandId,
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
