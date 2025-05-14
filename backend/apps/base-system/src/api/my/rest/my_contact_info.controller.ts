import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MyContactInfoCreateCommand } from '@app/base-system/lib/bounded-contexts/my/application/commands/my-contact-info-create.command';
import { MyContactInfoDeleteCommand } from '@app/base-system/lib/bounded-contexts/my/application/commands/my-contact-info-delete.command';
import { MyContactInfoUpdateCommand } from '@app/base-system/lib/bounded-contexts/my/application/commands/my-contact-info-update.command';
import {
  MyContactInfoByIdQuery,
  MyContactInfoByUserIdQuery,
  MyContactInfoByUsernameQuery,
} from '@app/base-system/lib/bounded-contexts/my/application/queries/my-contact-info.query';
import { UserInfoByUsernameQuery } from '@app/base-system/lib/bounded-contexts/my/application/queries/user-info-by-username.query';

import { Public } from '@lib/infra/decorators/public.decorator';
import { ApiRes } from '@lib/infra/rest/res.response';

import {
  MyContactInfoQueryDto,
  MyContactInfoCreateDto,
  MyContactInfoUpdateDto,
  MyContactInfoDeleteDto,
} from '../dto/my_contact_info.dto';

@ApiTags('MyHome - Module')
@Controller('my')
export class MyContactInfoController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('contact-info')
  @Public()
  @ApiOperation({
    summary: 'Retrieve MyHomeContactInfo',
  })
  async getMyHomeContactInfo(
    @Query() queryDto: MyContactInfoQueryDto,
  ): Promise<ApiRes<any>> {
    if (queryDto.id) {
      const result = await this.queryBus.execute(
        new MyContactInfoByIdQuery(queryDto.id),
      );
      if (result) {
        return ApiRes.success(result);
      } else {
        return ApiRes.error(404, 'Contact info not found');
      }
    } else if (queryDto.userId) {
      const result = await this.queryBus.execute(
        new MyContactInfoByUserIdQuery(queryDto.userId),
      );
      if (result) {
        return ApiRes.success(result);
      } else {
        return ApiRes.error(404, 'Contact info not found');
      }
    } else if (queryDto.username) {
      const result = await this.queryBus.execute(
        new MyContactInfoByUsernameQuery(queryDto.username),
      );
      if (result) {
        return ApiRes.success(result);
      } else {
        return ApiRes.error(404, 'Contact info not found');
      }
    }
    return ApiRes.error(400, 'Invalid query');
  }

  @Post('contact-info')
  @ApiOperation({ summary: 'Create a New MyHomeContactInfo' })
  @ApiResponse({
    status: 201,
    description: 'The MyHomeContactInfo has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createMyHomeContactInfo(
    @Body() dto: MyContactInfoCreateDto,
    @Request() req: any,
  ): Promise<ApiRes<null>> {
    try {
      await this.commandBus.execute(
        new MyContactInfoCreateCommand(
          req.user.uid,
          dto.userId,
          dto.icon,
          dto.contactName,
          dto.contact,
          dto.showContactName,
          dto.link,
          dto.linkType,
          dto.status,
        ),
      );
      return ApiRes.ok();
    } catch (e) {
      return ApiRes.error(400, e.message);
    }
  }

  @Put('contact-info')
  @ApiOperation({ summary: 'Update MyHomeContactInfo' })
  @ApiResponse({
    status: 201,
    description: 'The MyHomeContactInfo has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateMyHomeContactInfo(
    @Body() dto: MyContactInfoUpdateDto,
    @Request() req: any,
  ) {
    try {
      await this.commandBus.execute(
        new MyContactInfoUpdateCommand(
          req.user.uid,
          dto.id,
          dto.userId,
          dto.icon,
          dto.contactName,
          dto.contact,
          dto.showContactName,
          dto.link,
          dto.linkType,
          dto.status,
        ),
      );
      return ApiRes.ok();
    } catch (e) {
      return ApiRes.error(400, e.message);
    }
  }

  @Delete('contact-info')
  @ApiOperation({ summary: 'Delete a MyHomeContactInfo' })
  @ApiResponse({
    status: 201,
    description: 'The MyHomeContactInfo has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteMyHomeContactInfo(
    @Body() dto: MyContactInfoDeleteDto,
  ): Promise<ApiRes<null>> {
    try {
      await this.commandBus.execute(new MyContactInfoDeleteCommand(dto.id));
      return ApiRes.ok();
    } catch (e) {
      return ApiRes.error(400, e);
    }
  }

  // 获取用户信息
  @Get('user-info')
  @Public()
  @ApiOperation({ summary: 'Get User Info by Username' })
  async getUserInfoByUsername(
    @Query() queryDto: { username: string },
  ): Promise<ApiRes<any>> {
    const userInfo = await this.queryBus.execute(
      new UserInfoByUsernameQuery(queryDto.username),
    );
    console.log(userInfo, 'userInfo', queryDto);
    if (userInfo) {
      return ApiRes.success(userInfo);
    } else {
      return ApiRes.error(404, 'User not found');
    }
  }
}
