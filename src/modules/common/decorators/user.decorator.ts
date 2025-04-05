import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserData } from '../model/user.data';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserData }>();
    return request.user;
  },
);
