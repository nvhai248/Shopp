import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('home')
  root() {
    return { message: 'Hello Word!' };
  }

  @Get('/test')
  @Render('auth/login')
  login() {
    return { message: 'Hello Word!' };
  }
}
