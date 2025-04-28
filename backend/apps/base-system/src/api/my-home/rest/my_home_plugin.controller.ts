import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MyHomePluginInstanceQueryDto } from '@app/base-system/api/my-home/dto/my_home_plugin.dto';

import { Public } from '@lib/infra/decorators/public.decorator';
import { ApiRes } from '@lib/infra/rest/res.response';
import { PrismaService } from '@lib/shared/prisma/prisma.service';

@ApiTags('MyHome - Module')
@Controller('my-home')
export class MyHomePluginController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('plugin-instance')
  @Public()
  @ApiOperation({
    summary: 'Retrieve Paginated MyHomeContactInfo',
  })
  async getMyHomePluginInstance(
    @Query() queryDto: MyHomePluginInstanceQueryDto,
  ): Promise<ApiRes<any>> {
    console.log(queryDto, 'q');
    let queryUserId: { id: string } | null = null;
    if (queryDto.username && !queryDto.userId) {
      queryUserId = await this.prisma.sysUser.findFirst({
        select: { id: true },
        where: {
          username: queryDto.username,
          status: 'ENABLED',
        },
      });
      console.log(queryUserId, 'queryUserId');
      if (queryUserId) {
        queryDto.userId = queryUserId.id;
      }
    }
    console.log(queryDto.userId, queryUserId);
    if (queryDto.userId) {
      const pluginInstance = await this.prisma.myHomePluginInstance.findMany({
        where: {
          userId: queryDto.userId,
          status: 'ENABLED',
        },
      });
      console.log(pluginInstance, 'pluginInstance');
      if (!pluginInstance) {
        return ApiRes.error(400, 'Invalid query');
      }
      const result: {}[] = [];
      for (const item of pluginInstance) {
        result.push({
          userId: item.userId,
          meta: item.meta,
          ...(await this.prisma.myHomePlugin.findFirst({
            where: {
              id: item.pluginId,
              status: 'ENABLED',
            },
          })),
        });
      }
      console.log(result, 'result');
      return ApiRes.success({ records: result });
    } else {
      return ApiRes.error(400, 'Invalid query');
    }
  }
}
