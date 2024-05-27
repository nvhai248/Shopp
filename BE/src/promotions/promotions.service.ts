import { Injectable } from '@nestjs/common';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { PromotionRepository } from './promotions.repository';
import { CreatePromotionItemInput } from './dto/create-item.input';
import { ItemPromotionRepository } from './item-promotions.repository';

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
    return this.itemPromotionRepository.create(createPromotionItemInput);
  }
}
