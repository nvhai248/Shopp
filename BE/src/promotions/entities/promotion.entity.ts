import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { PROMOTION_LEVEL, PROMOTION_TYPE } from 'src/utils/const';

@ObjectType()
export class Promotion {
  @Field(() => ID)
  id: string;

  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field()
  @IsEnum(PROMOTION_LEVEL)
  level?: PROMOTION_LEVEL;

  @Field()
  @IsEnum(PROMOTION_TYPE)
  type?: PROMOTION_TYPE;

  @Field({ nullable: true })
  banner?: string;

  @Field({ nullable: true })
  discountPercentage?: number;

  @Field({ nullable: true })
  discountValue?: number;

  @Field({ nullable: true })
  minValue?: number;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field({ nullable: true })
  status?: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
