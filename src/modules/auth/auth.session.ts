import Joi from 'joi';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AppError } from 'configs/common/app-error';
import { ERROR_CODE } from 'configs/common/codes';
import { ICurrentUser } from './domain/current-user.model';

export const CurrentUser = createParamDecorator(
  (_: any, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest();

    const schema = Joi.object({
      uid: Joi.string().required(),
    }).options({ stripUnknown: true });
    const { error, value } = schema.validate(request.user);

    if (error) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    const currentUser: ICurrentUser = value;
    return currentUser;
  },
);
