import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocalGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() == 'http') {
    }
    if ((context.getType() as string) == 'graphql') {
      console.log('graphql is available');
    }
    console.log(context.getType());
    return true;
  }
}
