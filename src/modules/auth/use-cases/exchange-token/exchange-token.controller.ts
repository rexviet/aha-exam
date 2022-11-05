import { successResponse } from '@helpers/formatResponse';
import { AuthGuard } from '@modules/auth/auth.guard';
import { LocalAuthGuard } from '@modules/auth/local.auth.guard';
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
export class ExchangeSessionController {
  @ApiOperation({ summary: 'Exchange session' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @Get('/exchange-session')
  @UseGuards(LocalAuthGuard)
  public async changePassword(
    @Session() session: Record<string, any>,
    @Request() req,
    @Response() res,
  ) {
    session.abc = 'xyz';
    console.log('session:', session);
    console.log('session id:', session.id);

    return successResponse(
      'Exchange session successful',
      session,
      res,
      HttpStatus.OK,
    );
  }
}
