import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
// Catch all exceptions
export class GraphQLErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    return exception;
  }
}

// Format exception return
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
