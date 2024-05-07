import { GraphQLError } from 'graphql';
import { GRAPHQL_CODE_ERROR } from './const';
import { HttpStatus } from '@nestjs/common';

export class MyCustomException extends GraphQLError {
  constructor(
    message: string,
    private readonly code: string = GRAPHQL_CODE_ERROR.BadRequest,
    private statusCode: number = HttpStatus.BAD_REQUEST,
  ) {
    super(message, {
      extensions: {
        code: code,
        http: {
          status: statusCode,
        },
      },
    });
  }
}

export class MyUnAuthorizedException extends MyCustomException {
  constructor(message: string) {
    super(
      message,
      GRAPHQL_CODE_ERROR.UnAuthorizedError,
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class MyBadRequestException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.BadRequest, HttpStatus.BAD_REQUEST);
  }
}

export class MyDBException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.DBError, HttpStatus.BAD_REQUEST);
  }
}

export class MyForbiddenException extends MyCustomException {
  constructor(message: string) {
    super(message, GRAPHQL_CODE_ERROR.ForbiddenError, HttpStatus.FORBIDDEN);
  }
}

export class MyInternalServerException extends MyCustomException {
  constructor(message: string) {
    super(
      message,
      GRAPHQL_CODE_ERROR.InternalServerError,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
