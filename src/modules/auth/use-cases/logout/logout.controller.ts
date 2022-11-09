import { successResponse } from '@helpers/formatResponse';
import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import {
  Controller,
  Get,
  HttpStatus,
  Response,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {Response as Res} from 'express';

@ApiTags('auth')
@Controller('auth')
export class LogoutController {
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('/logout')
  @UseGuards(AuthenticatedGuard)
  public async logout(
    @Session() session: Record<string, any>,
    @Response() res: Res,
  ) {
    session.destroy();

    return successResponse('Logout successful', null, res, HttpStatus.OK);
  }
}
