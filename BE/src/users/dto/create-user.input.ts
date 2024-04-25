import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ defaultValue: null })
  birthDate: string;

  @Field({ defaultValue: null })
  address: string;
}
