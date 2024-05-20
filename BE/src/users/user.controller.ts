import { Controller, Get, Render } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  @Render('pages/user')
  async publishers() {
    const users = await this.userService.findAll();

    return { users: users };
  }
}
