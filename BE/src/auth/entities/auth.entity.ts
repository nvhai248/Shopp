import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => Int)
  expired_accessToken: number;

  @Field(() => Int)
  expired_refreshToken: number;

  @Field(() => User)
  user: User;
}
