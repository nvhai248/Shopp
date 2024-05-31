import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class About {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field()
  status: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
