import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('pages/login')
  login() {}

  @Get('/test')
  test() {
    return { test: 'OK' };
  }

  @Get('/order')
  @Render('pages/order')
  order() {}

  @Get('/review')
  @Render('pages/review')
  review() {}

  @Get('/on-promotion')
  @Render('pages/on-promotion')
  onPromotion() {}

  @Get('/about')
  @Render('pages/about')
  About() {}
}
