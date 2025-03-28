import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TokenPayload } from '../types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): TokenPayload =>
    context.switchToHttp().getRequest().user,
);
