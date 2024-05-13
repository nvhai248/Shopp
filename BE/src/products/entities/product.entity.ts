import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  gender: string;

  @Field()
  price: number;

  @Field()
  sale: boolean;

  @Field()
  createdBy: number;

  @Field()
  categoryId: number;

  @Field()
  storeId: number;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  avatar: string;

  @Field(() => [String], { nullable: true })
  cover: string[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
