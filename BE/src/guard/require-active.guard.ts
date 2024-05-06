import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { USER_STATUS } from 'src/utils/const';
import { MyForbiddenException } from 'src/utils/error';

@Injectable()
export class RequireActiveGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);

    if (ctx.getContext().req.user.status !== USER_STATUS.ACTIVE) {
      throw new MyForbiddenException('Please verify that account');
    }

    return true;
  }
}
