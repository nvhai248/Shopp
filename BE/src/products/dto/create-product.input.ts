import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { PRODUCT_TYPE } from 'src/utils/const';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  categoryId: string;

  @Field({ nullable: true })
  brandId: string;

  @Field()
  price: number;

  @Field(() => [String], { nullable: true })
  @IsEnum(PRODUCT_TYPE, { each: true })
  types: PRODUCT_TYPE[];

  @Field({ nullable: true })
  avatar: string;

  @Field(() => [String], { nullable: true })
  cover: string[];
}
