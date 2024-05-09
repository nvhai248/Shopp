import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  categoryId: string;

  @Field({ nullable: true })
  brandId: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  sale: boolean;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  avatar: string;

  @Field(() => [String], { nullable: true })
  cover: string[];
}
