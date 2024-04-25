import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { ProductInCart } from './ProductInCart';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  birthDate: string; //"YYYY-MM-DD"

  @Field(() => Int, { defaultValue: true })
  status: number;

  @Field({ nullable: true })
  address: string;

  @Field((type) => [ProductInCart], { defaultValue: [] })
  cart: ProductInCart[];

  @Field()
  createdAt: string; //"YYYY-MM-DD"

  @Field()
  updatedAt: string; //"YYYY-MM-DD"
}
