import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersResolver } from './publishers.resolver';
import { PublishersRepository } from './publishers.repository';

@Module({
  providers: [PublishersResolver, PublishersService, PublishersRepository],
})
export class PublishersModule {}
