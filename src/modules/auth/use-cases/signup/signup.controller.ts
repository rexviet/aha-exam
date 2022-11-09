import { successResponse } from '@helpers/formatResponse';
import { SignUpParams } from '@modules/auth/domain/params/signup.params';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Response,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './signup.dto';
import { SignUpSymbol } from './signup.provider';
import { SignUpService } from './signup.service';
import {Response as Res} from 'express';

@ApiTags('auth')
@Controller('auth')
export class SignUpController {
  constructor(
    @Inject(SignUpSymbol)
    private signUpService: SignUpService,
  ) {}

  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post('/signup')
  public async CreateUser(@Body() body: SignUpDto, @Response() res: Res) {
    const params = new SignUpParams(
      body.email,
      body.password,
      body.confirmPassword,
    );
    const user = await this.signUpService.execute(params);

    return successResponse('Signup successful', user, res, HttpStatus.CREATED);
  }
}
