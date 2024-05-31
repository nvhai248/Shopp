import { Controller, Get, Render } from '@nestjs/common';
import { AboutsService } from './abouts.service';

@Controller('/')
export class AboutsController {
  constructor(private readonly aboutService: AboutsService) {}

  @Get('/about')
  @Render('pages/about')
  async order() {
    const abouts = await this.aboutService.findAll();

    return {
      abouts: abouts,
    };
  }
}
