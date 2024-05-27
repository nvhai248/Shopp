import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller('/')
export class PromotionController {
  constructor() {}

  @Get('/promotion')
  @Render('pages/promotion/promotion')
  promotion() {}

  @Get('/create-promotion')
  @Render('pages/promotion/create-promotion')
  createPromotion() {}
}
