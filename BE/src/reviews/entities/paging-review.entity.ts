import { ObjectType, Field } from '@nestjs/graphql';
import { PagingResponse } from 'src/interfaces/paging.response';
import { Review } from './review.entity';

@ObjectType()
export class PagingReviewResponse extends PagingResponse {
  @Field(() => [Review], { defaultValue: [] })
  data: Review[];
}
