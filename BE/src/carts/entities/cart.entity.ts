import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Cart {
  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field()
  quantity: number;

  @Field()
  price: number;
}
