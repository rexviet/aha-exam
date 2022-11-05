import { successResponse } from '@helpers/formatResponse';
import { CurrentUser } from '@modules/auth/auth.session';
import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import { ICurrentUser } from '@modules/auth/domain/current-user.model';
import { ChangePasswordParams } from '@modules/auth/domain/params/change-password.params';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './change-password.dto';
import { ChangePasswordSymbol } from './change-password.provider';
import { ChangePasswordService } from './change-password.service';

@ApiTags('auth')
@Controller('auth')
export class ChangePasswordController {
  constructor(
    @Inject(ChangePasswordSymbol)
    private changePasswordService: ChangePasswordService,
  ) {}

  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UseGuards(AuthenticatedGuard)
  @Post('/change-password')
  public async changePassword(
    @Body() body: ChangePasswordDto,
    @CurrentUser() currentUser: ICurrentUser,
    @Response() res,
  ) {
    const params = new ChangePasswordParams(
      currentUser.uid,
      body.currentPassword,
      body.newPassword,
      body.confirmNewPassword,
    );
    const user = await this.changePasswordService.execute(params);

    return successResponse(
      'Change password successful',
      user,
      res,
      HttpStatus.OK,
    );
  }
}
