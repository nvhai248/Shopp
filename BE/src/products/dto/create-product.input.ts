import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  categoryId: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  publisherId: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  avatar: string;

  @Field(() => [String], { nullable: true })
  cover: string[];
}
