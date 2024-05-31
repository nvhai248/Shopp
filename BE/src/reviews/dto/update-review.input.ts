import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateReviewInput {
  @Field()
  ownerId: string;

  @Field()
  productId: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  rate: number;

  @Field({ nullable: true })
  status: boolean;

  @Field({ nullable: true })
  images: string[] = [];
}
