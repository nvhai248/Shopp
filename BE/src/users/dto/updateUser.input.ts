import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  gender: string;
}
