import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { CreatePromotionItemInput } from './dto/create-item.input';

@Injectable()
export class ItemPromotionRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createItemPromotionInput: CreatePromotionItemInput) {
    try {
      const { productId, promotionId, quantity } = createItemPromotionInput;

      return await this.databaseService.productPromotion.create({
        data: {
          promotionId,
          productId,
          quantity,
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }
}
