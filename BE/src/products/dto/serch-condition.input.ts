import { InputType, Field } from '@nestjs/graphql';
import { PagingRequest } from 'src/interfaces';

@InputType()
export class SearchConditionInput extends PagingRequest {
  @Field({ nullable: true })
  keyword?: string | null;

  @Field({ nullable: true })
  categoryId?: string | null;

  @Field({ nullable: true })
  publisherId?: string | null;

  @Field({ nullable: true })
  isOnSale?: boolean | null;
}
