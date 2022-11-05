import {
  Catch,
  ExceptionFilter,
  HttpException,
  BadRequestException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { AppError } from 'configs/common/app-error';
import { ErrorList, ERROR_CODE } from 'configs/common/codes';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(
    exception: HttpException | BadRequestException | AppError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errorType = exception.constructor.name;

    switch (errorType) {
      case 'AppError':
        return this.renderAppError(exception, response);
      case 'BadRequestException':
        return this.renderBadRequestError(exception, response);
      case 'FirebaseAuthError':
        return this.renderFirebaseAuthError(exception, response);
      default:
        return this.renderUnknownError(exception, response);
    }
  }

  private renderBadRequestError(exception: any, response: any) {
    const error = exception.getResponse();
    response.status(error.statusCode).send({
      statusCode: error.statusCode,
      errors: error.message,
      message: ErrorList[ERROR_CODE.BAD_REQUEST].error,
      errorCode: ERROR_CODE.BAD_REQUEST,
      timestamp: new Date().toISOString(),
    });
  }

  private renderFirebaseAuthError(exception: any, response: any) {
    let statusCode = ErrorList[ERROR_CODE.SERVER_ERROR].code;
    let message = ErrorList[ERROR_CODE.SERVER_ERROR].error;
    let errorCode = ERROR_CODE.SERVER_ERROR;

    switch (exception.errorInfo.code) {
      case 'auth/email-already-exists':
        errorCode = ERROR_CODE.EMAIL_ALREADY_EXISTS;
        statusCode = ErrorList[errorCode].code;
        message = ErrorList[errorCode].error;
        break;
      case 'auth/id-token-expired':
        errorCode = ERROR_CODE.UNAUTHORIZED;
        statusCode = ErrorList[errorCode].code;
        message = ErrorList[errorCode].error;
        break;
      case 'auth/wrong-password':
        errorCode = ERROR_CODE.INVALID_PASSWORD;
        statusCode = ErrorList[errorCode].code;
        message = ErrorList[errorCode].error;
        break;
    }

    response.status(statusCode).send({
      statusCode,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
    });
  }

  private renderAppError(exception: any, response: any) {
    const error = exception.getErrors();
    if (error.statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error('exception:', exception);
    }
    response.status(error.statusCode).send({
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
      errorCode: error.errorCode,
      message: error.message,
      errors: error.errors,
      additionalData: error.additionalData,
    });
  }

  private renderUnknownError(exception: any, response: any) {
    const error =
      typeof exception.getResponse === 'function'
        ? exception.getResponse()
        : {};
    let status = error.statusCode || ErrorList[ERROR_CODE.SERVER_ERROR].code;
    let message = error.message || ErrorList[ERROR_CODE.SERVER_ERROR].error;
    let errorCode = error.error
      ? error.error.toUpperCase()
      : ERROR_CODE.SERVER_ERROR;

    if (error === 'ThrottlerException: Too Many Requests') {
      status = HttpStatus.TOO_MANY_REQUESTS;
      message = 'Too many requests api';
      errorCode = 'TOO_MANY_REQUESTS';
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error('exception:', exception);
    }
    response.status(status).send({
      statusCode: status,
      errorCode: errorCode,
      errors: [message],
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
