import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Cart } from 'src/carts/entities/cart.entity';

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

  @Field({ nullable: true })
  phoneNumber: string; //"YYYY-MM-DD"

  @Field({ nullable: true })
  gender: string; //"YYYY-MM-DD"

  @Field(() => Int, { defaultValue: true })
  status: number;

  @Field((type) => [Cart], { defaultValue: [] })
  cart: Cart[];

  @Field()
  createdAt: string; //"YYYY-MM-DD"

  @Field()
  updatedAt: string; //"YYYY-MM-DD"
}
