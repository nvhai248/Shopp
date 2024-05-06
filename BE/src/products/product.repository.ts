import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GENDER } from 'src/utils/const';
import { MyDBException } from 'src/utils/error';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createProductInput: CreateProductInput,
    categoryId: number,
    storeId: number,
    createdBy: number,
  ) {
    try {
      const { name, gender, price, sale, type, avatar, cover } =
        createProductInput;

      return await this.databaseService.product.create({
        data: {
          name: name,
          gender:
            gender === GENDER.MALE ||
            gender === GENDER.FEMALE ||
            gender === GENDER.ALL
              ? gender
              : GENDER.MALE,
          price: price,
          sale: sale,
          type: type,
          avatar: avatar,
          categoryId: categoryId,
          storeId: storeId,
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
