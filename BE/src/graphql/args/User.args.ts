import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserCreateArgs {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ defaultValue: null })
  birthDate: string;

  @Field({ defaultValue: null })
  address: string;
}
