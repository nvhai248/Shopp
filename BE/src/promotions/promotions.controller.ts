import { Controller, Get, Query, Render } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { ProductsService } from 'src/products/products.service';

@Controller('/')
export class PromotionController {
  constructor(
    private readonly promotionService: PromotionsService,
    private readonly productService: ProductsService,
  ) {}

  @Get('/promotion')
  @Render('pages/promotion/promotion')
  async promotion() {
    const promotions = await this.promotionService.findAll();

    return {
      promotions: promotions,
    };
  }

  @Get('/create-promotion')
  @Render('pages/promotion/create-promotion')
  createPromotion() {}

  @Get('/update-promotion')
  @Render('pages/promotion/update-promotion')
  async updatePromotion(@Query('id') id: string) {
    const promotion = await this.promotionService.findOne(id);
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    return {
      ...promotion,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  }

  @Get('/update-promotion-item')
  @Render('pages/promotion/edit-item')
  async itemPromotion(@Query('id') id: string) {
    const items = await this.promotionService.findAllItem(id);

    let products = [];

    for (let item of items) {
      const product = await this.productService.findOne(item.productId);
      products.push({ ...product, quantity: item.quantity });
    }

    return {
      id: id,
      products: products,
    };
  }
}
