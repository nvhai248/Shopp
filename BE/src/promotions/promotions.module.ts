import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsResolver } from './promotions.resolver';
import { PromotionController } from './promotions.controller';
import { PromotionRepository } from './promotions.repository';
import { ItemPromotionRepository } from './item-promotions.repository';

@Module({
  providers: [
    PromotionsResolver,
    PromotionsService,
    PromotionRepository,
    ItemPromotionRepository,
  ],
  controllers: [PromotionController],
})
export class PromotionsModule {}
