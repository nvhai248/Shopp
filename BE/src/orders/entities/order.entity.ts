import {
  ObjectType,
  Field,
  ID,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { PAYMENT_METHOD, STATUS_ORDER } from 'src/utils/const';
import { IsEnum } from 'class-validator';
import { OrderItem } from './order-item.entity';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  contactId: string;

  @Field()
  promotionId: string;

  @Field()
  ownerId: string;

  @Field()
  isPaid: boolean;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => Float)
  reducePrice: number;

  @Field()
  @IsEnum(PAYMENT_METHOD)
  paymentMethod: PAYMENT_METHOD;

  @Field(() => [OrderItem], { name: 'items' })
  items: OrderItem[];

  @Field()
  @IsEnum(STATUS_ORDER)
  status: STATUS_ORDER;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
