import { successResponse } from '@helpers/formatResponse';
import { CurrentUser } from '@modules/auth/auth.session';
import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import { ICurrentUser } from '@modules/auth/domain/current-user.model';
import { UpdateUserProfileParams } from '@modules/user/domain/params/update-user-profile.params';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Patch,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserProfileService } from '../update-user-profile/update-user-profile.service';
import { UpdateUserDto } from './update-my-profile.dto';
import { UpdateMyProfileSymbol } from './update-my-profile.provider';
import { Response as Res } from 'express';

@ApiTags('users')
@Controller('users')
export class UpdateMyProfileController {
  constructor(
    @Inject(UpdateMyProfileSymbol)
    private updateMyProfileService: UpdateUserProfileService,
  ) {}

  @ApiOperation({ summary: 'Update my profile' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch('me')
  @UseGuards(AuthenticatedGuard)
  public async updateMyProfile(
    @Body() body: UpdateUserDto,
    @CurrentUser() currentUser: ICurrentUser,
    @Response() res: Res,
  ) {
    const params = new UpdateUserProfileParams(currentUser.uid, body.name);
    const user = await this.updateMyProfileService.execute(params);

    return successResponse(
      'Update my profile successful',
      user,
      res,
      HttpStatus.OK,
    );
  }
}
