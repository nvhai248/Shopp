import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Cart } from 'src/carts/entities/cart.entity';
import { GENDER } from 'src/utils/const';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field({ nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  @IsEnum(GENDER, { each: true })
  gender: string;

  @Field({ nullable: true })
  avatar: string;

  @Field(() => Int, { defaultValue: true })
  status: number;

  @Field((type) => [Cart], { defaultValue: [] })
  cart: Cart[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
