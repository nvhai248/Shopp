import { InputType, Field } from '@nestjs/graphql';
import { PagingRequest } from 'src/interfaces';

@InputType()
export class PagingOrderInput extends PagingRequest {
  @Field({ nullable: true })
  isAvailable?: boolean;
}
