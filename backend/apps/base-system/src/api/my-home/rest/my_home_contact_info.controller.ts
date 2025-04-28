import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MyHomeContactInfoQueryDto } from '@app/base-system/api/my-home/dto/my_home_contact_info.dto';
// import { AccessKeyCreateCommand } from '@app/base-system/lib/bounded-contexts/access-key/commands/access_key-create.command';
// import { AccessKeyDeleteCommand } from '@app/base-system/lib/bounded-contexts/access-key/commands/access_key-delete.command';

import { Public } from '@lib/infra/decorators/public.decorator';
import { ApiRes } from '@lib/infra/rest/res.response';
// import { BUILT_IN } from '@lib/shared/prisma/db.constant';
import { PaginationResult } from '@lib/shared/prisma/pagination';
import { PrismaService } from '@lib/shared/prisma/prisma.service';

// import { MyHomeContactInfoCreateDto } from '../dto/my_home.dto';

@ApiTags('MyHome - Module')
@Controller('my-home')
export class MyHomeContactInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Get('contact-info')
  @Public()
  @ApiOperation({
    summary: 'Retrieve Paginated MyHomeContactInfo',
  })
  async getMyHomeContactInfo(
    @Query() queryDto: MyHomeContactInfoQueryDto,
  ): Promise<ApiRes<any>> {
    let result;
    let userData;
    if (queryDto.id) {
      result = await this.prisma.myHomeContactInfo.findMany({
        where: {
          id: queryDto.id,
          status: 'ENABLED',
        },
      });
      if (result.length === 0) {
        return ApiRes.error(400, 'Invalid query');
      }
      userData = await this.prisma.sysUser.findFirst({
        select: { id: true, username: true, nickName: true, avatar: true },
        where: {
          id: result[0].userId,
          status: 'ENABLED',
        },
      });
    } else if (queryDto.userId) {
      userData = await this.prisma.sysUser.findFirst({
        select: { id: true, username: true, nickName: true, avatar: true },
        where: {
          id: queryDto.userId,
          status: 'ENABLED',
        },
      });
      if (!userData) {
        return ApiRes.error(400, 'Invalid query');
      }
      result = await this.prisma.myHomeContactInfo.findMany({
        where: {
          userId: queryDto.userId,
          status: 'ENABLED',
        },
      });
    } else if (queryDto.username) {
      userData = await this.prisma.sysUser.findFirst({
        select: { id: true, username: true, nickName: true, avatar: true },
        where: {
          username: queryDto.username,
          status: 'ENABLED',
        },
      });
      if (!userData) {
        return ApiRes.error(400, 'Invalid query');
      }
      result = await this.prisma.myHomeContactInfo.findMany({
        where: {
          userId: userData.id,
          status: 'ENABLED',
        },
      });
    } else {
      return ApiRes.error(400, 'Invalid query');
    }

    return ApiRes.success({ ...userData, records: result });
  }
  //
  // @Post()
  // @ApiOperation({ summary: 'Create a New AccessKey' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The accessKey has been successfully created.',
  // })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // async createAccessKey(
  //   @Body() dto: MyHomeContactInfoCreateDto,
  //   @Request() req: any,
  // ): Promise<ApiRes<null>> {
  //   await this.commandBus.execute(
  //     new AccessKeyCreateCommand(
  //       req.user.domain === BUILT_IN ? dto.domain : req.user.domain,
  //       dto.description,
  //       req.user.uid,
  //     ),
  //   );
  //   return ApiRes.ok();
  // }
  //
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a AccessKey' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The accessKey has been successfully deleted.',
  // })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // async deleteAccessKey(@Param('id') id: string): Promise<ApiRes<null>> {
  //   await this.commandBus.execute(new AccessKeyDeleteCommand(id));
  //   return ApiRes.ok();
  // }
}
