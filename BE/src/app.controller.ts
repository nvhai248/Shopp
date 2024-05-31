import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('pages/login')
  login() {}

  @Get('/about')
  @Render('pages/about')
  About() {}
}
