import { Module } from '@nestjs/common';
import { AboutsService } from './abouts.service';
import { AboutsResolver } from './abouts.resolver';

@Module({
  providers: [AboutsResolver, AboutsService],
})
export class AboutsModule {}
