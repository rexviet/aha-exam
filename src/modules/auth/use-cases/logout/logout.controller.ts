import { successResponse } from '@helpers/formatResponse';
import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import { BearerAuthGuard } from '@modules/auth/bearer.auth.guard';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
    @Response() res,
  ) {
    session.destroy();

    return successResponse('Logout successful', null, res, HttpStatus.OK);
  }
}
