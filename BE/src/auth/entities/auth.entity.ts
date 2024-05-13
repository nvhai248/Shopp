import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  accessToken: string;

  @Field(() => Int, { nullable: true })
  expired_accessToken: number;

  @Field({ nullable: true })
  refreshToken: string;

  @Field(() => Int, { nullable: true })
  expired_refreshToken: number;

  @Field(() => User, { nullable: true })
  data: User;
}
