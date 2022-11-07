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
    console.log('req.user:', req.user);
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
