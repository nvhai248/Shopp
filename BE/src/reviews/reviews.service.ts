import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { PagingReviewInput } from './dto/paging-review.input';

@Injectable()
export class ReviewsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createReviewInput: CreateReviewInput, ownerId: string) {
    try {
      const { productId, content, rate, images } = createReviewInput;
      const review = await this.databaseService.review.create({
        data: {
          productId,
          content,
          rate,
          images,
          ownerId,
        },
      });
      return review;
    } catch (error) {
      return new MyDBException(error.message);
    }
  }

  async findMany(conditions: PagingReviewInput, ownerId: string = undefined) {
    try {
      const offset =
        conditions.limit && conditions.page
          ? (conditions.page - 1) * conditions.limit
          : 0;

      let where = {};
      if (ownerId) {
        where = { ownerId: ownerId };
      }

      const orders = await this.databaseService.review.findMany({
        skip: offset,
        take: conditions.limit,
        orderBy: { updatedAt: 'desc' },
        where: where,
      });

      const count = await this.databaseService.review.count({
        skip: offset,
        take: conditions.limit,
        orderBy: { updatedAt: 'desc' },
        where: where,
      });

      return {
        limit: conditions.limit,
        page: conditions.page,
        total: count,
        data: orders,
      };
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  findOne(ownerId: string, productId: string) {
    try {
      return this.databaseService.review.findFirst({
        where: { ownerId: ownerId, productId: productId },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async update(
    productId: string,
    ownerId: string,
    updateReviewInput: UpdateReviewInput,
  ) {
    try {
      const isOk = await this.databaseService.review.update({
        where: {
          ownerId_productId: { ownerId, productId },
        },
        data: updateReviewInput,
      });

      return isOk ? true : false;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }
}
