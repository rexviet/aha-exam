import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class GetListUsersDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  pageSize?: number;
}
