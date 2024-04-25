import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductInCart {
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
