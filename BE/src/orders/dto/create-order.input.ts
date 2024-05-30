import { InputType, Field, Float } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { PAYMENT_METHOD } from 'src/utils/const';
import { OrderItemInput } from './order-item.input';

@InputType()
export class CreateOrderInput {
  @Field()
  contactId: string;

  @Field()
  promotionId: string;

  @Field()
  isPaid: boolean;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => Float)
  reducePrice: number;

  @Field()
  @IsEnum(PAYMENT_METHOD)
  paymentMethod: PAYMENT_METHOD;

  @Field(() => [OrderItemInput])
  items: OrderItemInput[];
}
