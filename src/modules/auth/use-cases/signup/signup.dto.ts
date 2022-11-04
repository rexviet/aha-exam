import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ErrorList, ERROR_CODE } from '@configs/common/codes';
import { IsPasswordValid } from '@modules/auth/auth.validator';

export class SignUpDto {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  readonly email!: string;

  @ApiProperty()
  @IsDefined()
  @IsPasswordValid({
    message: ErrorList[ERROR_CODE.INVALID_PASSWORD_FORMAT].error,
  })
  @IsString()
  readonly password!: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly confirmPassword!: string;
}
