import { successResponseUnWrap } from '@helpers/formatResponse';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { GetListUsersParams } from '@modules/user/domain/params/get-list-users.params';
import { GetListUsersSymbol } from './get-list-users.provider';
import { GetListUsersService } from './get-list-users.service';
import { GetListUsersDto } from './get-list-users.dto';
import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';

@ApiTags('users')
@Controller('users')
export class GetListUsersController {
  constructor(
    @Inject(GetListUsersSymbol)
    private getListUsersService: GetListUsersService,
  ) {}

  @ApiOperation({ summary: 'Get lists Users' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UseGuards(AuthenticatedGuard)
  @Get('')
  public async getListUsers(
    @Query() query: GetListUsersDto,
    @Response() res: Res,
  ) {
    const params = new GetListUsersParams(query.page, query.pageSize);
    const usersList = await this.getListUsersService.execute(params);

    return successResponseUnWrap(
      'Get list users successful',
      usersList,
      res,
      HttpStatus.OK,
    );
  }
}
