import { successResponse } from '@helpers/formatResponse';
import { BearerAuthGuard } from '@modules/auth/bearer.auth.guard';
import { ExchangeSessionParams } from '@modules/auth/domain/params/exchange-token.params';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Request,
  Response,
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
import {Request as Req, Response as Res} from 'express';

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
    @Request() req: Req,
    @Response() res: Res,
  ) {
    const params = new ExchangeSessionParams(
      req.user,
      req.method,
      req.originalUrl.split('?')[0],
    );
    const user = await this.exchangeTokenService.execute(params);
    return successResponse(
      'Exchange session successful',
      user,
      res,
      HttpStatus.OK,
    );
  }
}
