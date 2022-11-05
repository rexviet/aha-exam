import { successResponse } from '@helpers/formatResponse';
import { CurrentUser } from '@modules/auth/auth.session';
import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import { ICurrentUser } from '@modules/auth/domain/current-user.model';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMyProfileSymbol } from './get-user-by-uid.provider';
import { GetUserByUidService } from './get-user-by-uid.service';

@ApiTags('users')
@Controller('users')
export class GetMyProfileController {
  constructor(
    @Inject(GetMyProfileSymbol)
    private signUpService: GetUserByUidService,
  ) {}

  @ApiOperation({ summary: 'Get my profile' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UseGuards(AuthenticatedGuard)
  @Get('me')
  public async getMyProfile(
    @CurrentUser() currentUser: ICurrentUser,
    @Response() res,
  ) {
    const user = await this.signUpService.execute(currentUser.uid);

    return successResponse(
      'Get my profile successful',
      user,
      res,
      HttpStatus.OK,
    );
  }
}
