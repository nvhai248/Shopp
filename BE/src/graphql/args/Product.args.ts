import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AddProductArgs {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}
