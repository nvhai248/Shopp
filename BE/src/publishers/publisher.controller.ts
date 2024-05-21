import { Controller, Get, Render } from '@nestjs/common';
import { PublishersService } from './publishers.service';

@Controller('/publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublishersService) {}

  @Get('/')
  @Render('pages/publisher')
  async publishers() {
    const publisher = await this.publisherService.findMany();

    return { publisher: publisher };
  }
}
