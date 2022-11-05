import { successResponse } from '@helpers/formatResponse';
import { BearerAuthGuard } from '@modules/auth/bearer.auth.guard';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
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
import { ExchangeTokenSymbol } from './exchange-token.provider';
import { ExchangeTokenService } from './exchange-token.service';

@ApiTags('auth')
@Controller('auth')
export class ExchangeSessionController {
  constructor(
    @Inject(ExchangeTokenSymbol)
    private readonly exchangeTokenService: ExchangeTokenService,
  ) {}

  @ApiOperation({ summary: 'Exchange session' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @Get('/exchange-session')
  @UseGuards(BearerAuthGuard)
  public async exchangeSession(
    @Session() session: Record<string, any>,
    @Request() req,
    @Response() res,
  ) {
    this.exchangeTokenService.execute(req.user);
    return successResponse(
      'Exchange session successful',
      session,
      res,
      HttpStatus.OK,
    );
  }
}
