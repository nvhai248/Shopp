import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
export class PagingProduct<Product> {
  @Field(() => [Product], { defaultValue: [] })
  data: Product[];

  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Int, { nullable: true })
  limit: number;

  @Field(() => Int, { nullable: true })
  total: number;
}
