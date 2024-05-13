import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AddProductInput {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}
