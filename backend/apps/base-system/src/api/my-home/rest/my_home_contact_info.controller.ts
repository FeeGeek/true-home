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

import { MyHomeContactInfoCreateCommand } from '@app/base-system/lib/bounded-contexts/my-home/application/commands/my-home-contact-info-create.command';
import { MyHomeContactInfoDeleteCommand } from '@app/base-system/lib/bounded-contexts/my-home/application/commands/my-home-contact-info-delete.command';
import { MyHomeContactInfoUpdateCommand } from '@app/base-system/lib/bounded-contexts/my-home/application/commands/my-home-contact-info-update.command';
import {
  MyHomeContactInfoByIdQuery,
  MyHomeContactInfoByUserIdQuery,
  MyHomeContactInfoByUsernameQuery,
} from '@app/base-system/lib/bounded-contexts/my-home/application/queries/my-home-contact-info.query';
import { UserInfoByUsernameQuery } from '@app/base-system/lib/bounded-contexts/my-home/application/queries/user-info-by-username.query';

import { Public } from '@lib/infra/decorators/public.decorator';
import { ApiRes } from '@lib/infra/rest/res.response';

import {
  MyHomeContactInfoQueryDto,
  MyHomeContactInfoCreateDto,
  MyHomeContactInfoUpdateDto,
  MyHomeContactInfoDeleteDto,
} from '../dto/my_home_contact_info.dto';

@ApiTags('MyHome - Module')
@Controller('my-home')
export class MyHomeContactInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('contact-info')
  @Public()
  @ApiOperation({
    summary: 'Retrieve Paginated MyHomeContactInfo',
  })
  async getMyHomeContactInfo(
    @Query() queryDto: MyHomeContactInfoQueryDto,
  ): Promise<ApiRes<any>> {
    if (queryDto.id) {
      const result = await this.queryBus.execute(
        new MyHomeContactInfoByIdQuery(queryDto.id),
      );
      if (result) {
        return ApiRes.success(result);
      } else {
        return ApiRes.error(404, 'Contact info not found');
      }
    } else if (queryDto.userId) {
      const result = await this.queryBus.execute(
        new MyHomeContactInfoByUserIdQuery(queryDto.userId),
      );
      if (result) {
        return ApiRes.success(result);
      } else {
        return ApiRes.error(404, 'Contact info not found');
      }
    } else if (queryDto.username) {
      const result = await this.queryBus.execute(
        new MyHomeContactInfoByUsernameQuery(queryDto.username),
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
    @Body() dto: MyHomeContactInfoCreateDto,
    @Request() req: any,
  ): Promise<ApiRes<null>> {
    try {
      await this.commandBus.execute(
        new MyHomeContactInfoCreateCommand(
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
    @Body() dto: MyHomeContactInfoUpdateDto,
    @Request() req: any,
  ) {
    try {
      await this.commandBus.execute(
        new MyHomeContactInfoUpdateCommand(
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
    @Body() dto: MyHomeContactInfoDeleteDto,
  ): Promise<ApiRes<null>> {
    try {
      await this.commandBus.execute(new MyHomeContactInfoDeleteCommand(dto.id));
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
