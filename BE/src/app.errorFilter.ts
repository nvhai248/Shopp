import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class GraphQLErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    return exception;
  }
}
