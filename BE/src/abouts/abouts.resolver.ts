import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AboutsService } from './abouts.service';
import { About } from './entities/about.entity';
import { CreateAboutInput } from './dto/create-about.input';
import { UpdateAboutInput } from './dto/update-about.input';
import { UseGuards } from '@nestjs/common';
import { JwtAdminAuthGuard } from 'src/guard/jwt-auth.guard';

@Resolver(() => About)
export class AboutsResolver {
  constructor(private readonly aboutsService: AboutsService) {}

  @Mutation(() => About)
  @UseGuards(JwtAdminAuthGuard)
  createAbout(@Args('createAboutInput') createAboutInput: CreateAboutInput) {
    return this.aboutsService.create(createAboutInput);
  }

  @Query(() => [About], { name: 'abouts' })
  findAll() {
    return this.aboutsService.findAll();
  }

  @Query(() => About, { name: 'about' })
  @UseGuards(JwtAdminAuthGuard)
  findOne(@Args('id') id: string) {
    return this.aboutsService.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminAuthGuard)
  updateAbout(@Args('updateAboutInput') updateAboutInput: UpdateAboutInput) {
    return this.aboutsService.update(updateAboutInput.id, updateAboutInput);
  }
}
