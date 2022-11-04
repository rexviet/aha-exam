import { successResponse } from '@helpers/formatResponse';
import { CurrentUser } from '@modules/auth/auth.session';
import { ICurrentUser } from '@modules/auth/domain/current-user.model';
import { UpdateMyProfileParams } from '@modules/user/domain/params/update-my-profile.params';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Patch,
  Response,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './update-my-profile.dto';
import { UpdateMyProfileSymbol } from './update-my-profile.provider';
import { UpdateMyProfileService } from './update-my-profile.service';

@ApiTags('users')
@Controller('users')
export class UpdateMyProfileController {
  constructor(
    @Inject(UpdateMyProfileSymbol)
    private updateMyProfileService: UpdateMyProfileService,
  ) {}

  @ApiOperation({ summary: 'Update my profile' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch('me')
  @ApiBearerAuth()
  public async updateMyProfile(
    @Body() body: UpdateUserDto,
    @CurrentUser() currentUser: ICurrentUser,
    @Response() res,
  ) {
    const params = new UpdateMyProfileParams(currentUser.uid, body.name);
    const user = await this.updateMyProfileService.execute(params);

    return successResponse(
      'Update my profile successful',
      user,
      res,
      HttpStatus.OK,
    );
  }
}
