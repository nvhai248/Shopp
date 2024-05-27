import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { STATUS_PRODUCT } from 'src/utils/const';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';

@Injectable()
export class PromotionRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPromotionInput: CreatePromotionInput) {
    try {
      const {
        name,
        type,
        minValue,
        discountPercentage,
        description,
        discountValue,
        level,
        banner,
        startDate,
        endDate,
      } = createPromotionInput;

      if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        throw new BadRequestException('Invalid date format');
      }

      return await this.databaseService.promotion.create({
        data: {
          name: name,
          type: type,
          minValue: minValue,
          discountPercentage: discountPercentage,
          description: description,
          discountValue: discountValue,
          level: level,
          banner: banner,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findMany() {
    return await this.databaseService.promotion.findMany({
      where: { status: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.databaseService.promotion.findFirst({
      where: {
        id: id,
        status: true,
      },
    });
  }

  async update(id: string, updatePromotionInput: UpdatePromotionInput) {
    const result = await this.databaseService.promotion.update({
      where: { id: id },
      data: updatePromotionInput,
    });

    return result ? true : false;
  }
}
