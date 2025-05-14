import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MyHomePluginQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'id must be a string' })
  @IsNotEmpty({ message: 'id cannot be empty' })
  id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Status, { message: 'Status must be a valid enum value' })
  status?: Status;
}
