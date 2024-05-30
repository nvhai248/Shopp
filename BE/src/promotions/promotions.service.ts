import { Injectable } from '@nestjs/common';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { PromotionRepository } from './promotions.repository';
import { CreatePromotionItemInput } from './dto/create-item.input';
import { ItemPromotionRepository } from './item-promotions.repository';
import { RecommendInput } from './dto/recommend.input';
import { PROMOTION_LEVEL } from 'src/utils/const';

@Injectable()
export class PromotionsService {
  constructor(
    private readonly promotionRepository: PromotionRepository,
    private readonly itemPromotionRepository: ItemPromotionRepository,
  ) {}

  create(createPromotionInput: CreatePromotionInput) {
    return this.promotionRepository.create(createPromotionInput);
  }

  findAll() {
    return this.promotionRepository.findMany();
  }

  findOne(id: string) {
    return this.promotionRepository.findOne(id);
  }

  update(id: string, updatePromotionInput: UpdatePromotionInput) {
    return this.promotionRepository.update(id, updatePromotionInput);
  }

  createItem(createPromotionItemInput: CreatePromotionItemInput) {
    return this.itemPromotionRepository.createOrUpdate(
      createPromotionItemInput,
    );
  }

  async findAllItem(id: string) {
    return this.itemPromotionRepository.findAllByPromotionId(id);
  }

  updateItemQuantity(productId: string, promotionId: string, quantity: number) {
    return this.itemPromotionRepository.updateQuantity(
      productId,
      promotionId,
      quantity,
    );
  }

  deletePromotionItem(productId: string, promotionId: string) {
    return this.itemPromotionRepository.deletePromotionItem(
      productId,
      promotionId,
    );
  }

  async getRecommendPromotions(recommendInput: RecommendInput) {
    let result = [];
    result = await this.promotionRepository.recommend(
      recommendInput.totalValue,
      PROMOTION_LEVEL.ORDER,
    );

    const allPromotionLevelItem = await this.promotionRepository.recommend(
      undefined,
      PROMOTION_LEVEL.ITEM,
    );

    for (let item of allPromotionLevelItem) {
      for (let productQuantity of recommendInput.products) {
        const itemPromotion =
          await this.itemPromotionRepository.findOnePromotionItem(
            item.id,
            productQuantity.productId,
            productQuantity.quantity,
          );

        if (itemPromotion) {
          result.push(item);
        }
      }
    }

    return result;
  }
}
