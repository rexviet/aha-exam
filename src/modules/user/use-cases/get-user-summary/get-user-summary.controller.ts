import { successResponse } from '@helpers/formatResponse';
import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { GetUserSummarySymbol } from './get-user-summary.provider';
import { GetUserSummaryService } from './get-user-summary.service';

@ApiTags('users')
@Controller('users')
export class GetUserSummaryController {
  constructor(
    @Inject(GetUserSummarySymbol)
    private getSummaryService: GetUserSummaryService,
  ) {}

  @ApiOperation({ summary: 'Get user summary' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UseGuards(AuthenticatedGuard)
  @Get('/summary')
  public async getUserSummary(@Response() res: Res) {
    const summary = await this.getSummaryService.execute();

    return successResponse(
      'Get user summary successful',
      summary,
      res,
      HttpStatus.OK,
    );
  }
}
