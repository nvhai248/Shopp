import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionsService } from './promotions.service';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { CreatePromotionItemInput } from './dto/create-item.input';
import { PromotionItem } from './entities/item-promotion.entity';

@Resolver(() => Promotion)
export class PromotionsResolver {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Mutation(() => Promotion)
  createPromotion(
    @Args('createPromotionInput') createPromotionInput: CreatePromotionInput,
  ) {
    return this.promotionsService.create(createPromotionInput);
  }

  @Mutation(() => PromotionItem)
  createItemPromotion(
    @Args('createPromotionItemInput')
    createPromotionItemInput: CreatePromotionItemInput,
  ) {
    return this.promotionsService.createItem(createPromotionItemInput);
  }

  @Query(() => [Promotion], { name: 'promotions' })
  findAll() {
    return this.promotionsService.findAll();
  }

  @Query(() => Promotion, { name: 'promotion' })
  findOne(@Args('id') id: string) {
    return this.promotionsService.findOne(id);
  }

  @Mutation(() => Boolean)
  updatePromotion(
    @Args('updatePromotionInput') updatePromotionInput: UpdatePromotionInput,
  ) {
    return this.promotionsService.update(
      updatePromotionInput.id,
      updatePromotionInput,
    );
  }
}