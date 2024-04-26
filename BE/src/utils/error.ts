import { GraphQLError } from 'graphql';
import { GRAPHQL_CODE_ERROR } from './const';
import { HttpStatus } from '@nestjs/common';

export class MyCustomError extends GraphQLError {
  constructor(
    message: string,
    private readonly code: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.name = 'MyCustomError';
  }
}

export class UnAuthorizedError extends MyCustomError {
  constructor(message: string) {
    super(message);
    this.name = GRAPHQL_CODE_ERROR.UnAuthorizedError;
  }
}

export class BadRequestError extends MyCustomError {
  constructor(message: string) {
    super(message);
    this.name = GRAPHQL_CODE_ERROR.BadRequest;
  }
}
