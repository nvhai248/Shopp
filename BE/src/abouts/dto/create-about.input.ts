import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAboutInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;
}
