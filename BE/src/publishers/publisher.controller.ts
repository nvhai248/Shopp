import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, Render } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { SITE_DOMAIN } from 'src/utils/const';

@Controller('/publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublishersService) {}

  @Get('/')
  @Render('pages/publisher')
  async publishers(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,) {
    const publisher = await this.publisherService.findMany();

    return {
      backend_base_url: SITE_DOMAIN,
      publisher: publisher,
    };
  }
}
