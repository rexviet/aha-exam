import { successResponse } from '@helpers/formatResponse';
import { CreateUserParams } from '@modules/user/domain/params/create-user.params';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Response,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { CreateUserSymbol } from './create-user.provider';
import { CreateUserService } from './create-user.service';

@ApiTags('users')
@Controller('users')
export class CreateUserController {
  constructor(
    @Inject(CreateUserSymbol)
    private signUpService: CreateUserService,
  ) {}

  @ApiOperation({ summary: 'Create User API for Cloud Function hook call' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post('')
  public async createUser(@Body() body: CreateUserDto, @Response() res) {
    const params = new CreateUserParams(
      body.provider,
      body.uid,
      body.emailVerified,
      body.email,
      body.displayName,
      body.photoURL,
    );
    const user = await this.signUpService.execute(params);

    return successResponse(
      'Create user successful',
      user,
      res,
      HttpStatus.CREATED,
    );
  }
}
