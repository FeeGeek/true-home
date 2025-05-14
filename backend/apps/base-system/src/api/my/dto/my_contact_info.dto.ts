import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class MyContactInfoQueryDto {
  @ApiProperty({ required: false })
  @ValidateIf((obj) => !obj.userId && !obj.username)
  @IsOptional()
  @IsString({ message: 'id must be a string' })
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Type(() => String)
  id: string | null;

  @ApiProperty({ required: false })
  @ValidateIf((obj) => !obj.id && !obj.username)
  @IsOptional()
  @IsString({ message: 'userId must be a string' })
  @IsNotEmpty({ message: 'userId cannot be empty' })
  @Type(() => String)
  userId: string | null;

  @ApiProperty({ required: false })
  @ValidateIf((obj) => !obj.id && !obj.userId)
  @IsOptional()
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username cannot be empty' })
  @Type(() => String)
  username: string | null;
}

export class MyContactInfoCreateDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'userId must be a string' })
  @IsNotEmpty({ message: 'userId cannot be empty.' })
  userId: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'icon must be a string' })
  @IsNotEmpty({ message: 'icon cannot be empty.' })
  icon: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'contactName must be a string' })
  @IsNotEmpty({ message: 'contactName cannot be empty.' })
  contactName: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'contact must be a string' })
  @IsNotEmpty({ message: 'contact cannot be empty.' })
  contact: string;

  @ApiProperty({ required: true })
  @IsBoolean({ message: 'showContactName cannot be boolean' })
  @IsNotEmpty({ message: 'showContactName cannot be empty.' })
  showContactName: boolean;

  @ApiProperty({ required: true })
  @IsString({ message: 'link must be a string' })
  @IsNotEmpty({ message: 'link cannot be empty.' })
  link: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'linkType must be a string' })
  @IsNotEmpty({ message: 'linkType cannot be empty.' })
  linkType: string;

  @ApiProperty({ required: true })
  @IsEnum(Status, { message: 'Status must be a valid enum value' })
  status: Status;
}

export class MyContactInfoUpdateDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'id must be a string' })
  @IsNotEmpty({ message: 'id cannot be empty' })
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'userId must be a string' })
  userId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'icon must be a string' })
  icon: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'contactName must be a string' })
  contactName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'contact must be a string' })
  contact: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean({ message: 'showContactName cannot be boolean' })
  showContactName: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'link must be a string' })
  link: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'linkType must be a string' })
  linkType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Status, { message: 'Status must be a valid enum value' })
  status: Status;
}

export class MyContactInfoDeleteDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'id must be a string' })
  @IsNotEmpty({ message: 'id cannot be empty' })
  id: string;
}
