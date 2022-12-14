import { HttpStatus } from '@nestjs/common';

interface IErrorDetails {
  message: string;
  key: string;
  code: string;
}

enum ERROR_CODE {
  SERVER_ERROR = 'SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  UNAUTHORIZED = 'UNAUTHORIZED',
  CONFLICT = 'CONFLICT',
  FORBIDDEN = 'FORBIDDEN',
  UNVERIFIED = 'UNVERIFIED',
  RESTRICTED = 'RESTRICTED',
  PASSWORD_NOT_MATCH = 'PASSWORD_NOT_MATCH',
  INVALID_PASSWORD_FORMAT = 'INVALID_PASSWORD_FORMAT',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  USER_NOT_EXISTS = 'USER_NOT_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

const ErrorList = {
  [ERROR_CODE.SERVER_ERROR]: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    error: 'E_SERVER_ERROR',
  },
  [ERROR_CODE.BAD_REQUEST]: {
    code: HttpStatus.BAD_REQUEST,
    error: 'E_BAD_REQUEST',
  },
  [ERROR_CODE.NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    error: 'E_NOT_FOUND',
  },
  [ERROR_CODE.UNPROCESSABLE_ENTITY]: {
    code: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'E_UNPROCESSABLE_ENTITY',
  },
  [ERROR_CODE.UNAUTHORIZED]: {
    code: HttpStatus.UNAUTHORIZED,
    error: 'E_UNAUTHORIZED',
  },
  [ERROR_CODE.CONFLICT]: {
    code: HttpStatus.CONFLICT,
    error: 'E_CONFLICT',
  },
  [ERROR_CODE.FORBIDDEN]: {
    code: HttpStatus.FORBIDDEN,
    error: 'E_FORBIDDEN',
  },
  [ERROR_CODE.UNVERIFIED]: {
    code: HttpStatus.NOT_ACCEPTABLE,
    error: 'E_UNVERIFIED',
  },
  [ERROR_CODE.RESTRICTED]: {
    code: HttpStatus.PRECONDITION_FAILED,
    error: 'E_RESTRICTED',
  },
  [ERROR_CODE.PASSWORD_NOT_MATCH]: {
    code: HttpStatus.BAD_REQUEST,
    error: 'Password not match',
  },
  [ERROR_CODE.INVALID_PASSWORD_FORMAT]: {
    code: HttpStatus.BAD_REQUEST,
    error:
      'Password must has lower case, upper case, digits, special characters, and at least 8 characters',
  },
  [ERROR_CODE.INVALID_PASSWORD]: {
    code: HttpStatus.UNAUTHORIZED,
    error: 'Invalid password',
  },
  [ERROR_CODE.EMAIL_ALREADY_EXISTS]: {
    code: HttpStatus.CONFLICT,
    error: 'Email already exists',
  },
  [ERROR_CODE.USER_NOT_EXISTS]: {
    code: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'User not exists',
  },
  [ERROR_CODE.USER_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    error: 'User not found',
  },
};

export { IErrorDetails, ERROR_CODE, ErrorList };
