import { Controller, Get, Render } from '@nestjs/common';
import { UsersService } from './users.service';
import { SITE_DOMAIN } from 'src/utils/const';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  @Render('pages/login')
  login() {
    return {
      backend_base_url: SITE_DOMAIN,
    };
  }

  @Get('/user')
  @Render('pages/user')
  async publishers() {
    const users = await this.userService.findAll();

    return {
      backend_base_url: SITE_DOMAIN,
      users: users,
    };
  }
}
