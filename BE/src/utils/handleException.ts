import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
// Catch all exceptions
export class GraphQLErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    return exception;
  }
}

export function FormatError(error) {
  const originalError = error.extensions?.originalError;

  if (!originalError) {
    return {
      message: error.message,
      code: error.extensions?.code,
      stack: error.stack, // Return the stack trace
    };
  }

  return {
    message: originalError.message,
    code: error.extensions?.code,
    stack: originalError.stack, // Return the stack trace of the original error
  };
}
