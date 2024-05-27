import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('pages/login')
  login() {}

  @Get('/order')
  @Render('pages/order')
  order() {}

  @Get('/review')
  @Render('pages/review')
  review() {}

  @Get('/about')
  @Render('pages/about')
  About() {}
}
