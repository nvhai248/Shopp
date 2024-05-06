import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql'; // Import from GqlArgumentsHost
import { MyCustomException } from './error';

@Catch()
export class GraphQLErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    /* const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext(); */

    //console.log(ctx);

    /* const response = ctx.res;

    response.status(statusCode).json({
      errors: [
        {
          message: message,
          statusCode: statusCode,
          name: name,
        },
      ],
      data: null,
    }); */
    return exception;
  }
}

export function FormatError(error) {
  const originalError = error.extensions?.originalError;

  if (!originalError) {
    return {
      message: error.message,
      code: error.extensions?.code,
    };
  }
  return {
    message: originalError.message,
    code: error.extensions?.code,
  };
}
