import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  JwtAccessAuthGuard,
  JwtAdminAuthGuard,
} from 'src/guard/jwt-auth.guard';
import { CurrentUserInterface } from 'src/interfaces';
import { PagingReviewResponse } from './entities/paging-review.entity';
import { PagingReviewInput } from './dto/paging-review.input';
import { FindReviewInput } from './dto/find-review.input';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  @UseGuards(JwtAccessAuthGuard)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.reviewsService.create(createReviewInput, user.id);
  }

  @Query(() => PagingReviewResponse, { name: 'orders' })
  @UseGuards(JwtAdminAuthGuard)
  findAll(@Args('pagingReviewInput') pagingReviewInput: PagingReviewInput) {
    return this.reviewsService.findMany(pagingReviewInput);
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args('findReviewInput') findReviewInput: FindReviewInput) {
    return this.reviewsService.findOne(
      findReviewInput.ownerId,
      findReviewInput.productId,
    );
  }

  @Query(() => PagingReviewResponse, { name: 'historiesReview' })
  @UseGuards(JwtAccessAuthGuard)
  historiesReview(
    @Args('pagingReviewInput') pagingReviewInput: PagingReviewInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.reviewsService.findMany(pagingReviewInput, user.id);
  }

  @Mutation(() => Boolean, { name: 'updateStatusReview' })
  @UseGuards(JwtAdminAuthGuard)
  updateStatusReview(
    @Args('updateStatusReviewInput') updateStatusReviewInput: UpdateReviewInput,
  ) {
    return this.reviewsService.update(
      updateStatusReviewInput.productId,
      updateStatusReviewInput.ownerId,
      updateStatusReviewInput,
    );
  }
}
