import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ObjectType()
export class Review {
  @Field()
  productId: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  @Min(1)
  @Max(5)
  rate: number;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  images: string[] = [];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
