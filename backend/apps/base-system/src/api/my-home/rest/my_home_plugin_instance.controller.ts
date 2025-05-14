import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Status } from '@prisma/client';

import { MyHomePluginInstanceQueryDto } from '@app/base-system/api/my-home/dto/my_home_plugin_instance.dto';
import { UserInfoByUsernameQuery } from '@app/base-system/lib/bounded-contexts/my/application/queries/user-info-by-username.query';
import { MyHomePluginInstanceByUserIdQuery } from '@app/base-system/lib/bounded-contexts/my-home/application/queries/my-home-plugin-instance.query';
import { MyHomePluginByIdQuery } from '@app/base-system/lib/bounded-contexts/my-home/application/queries/my-home-plugin.query';

import { Public } from '@lib/infra/decorators/public.decorator';
import { ApiRes } from '@lib/infra/rest/res.response';

@ApiTags('MyHome - Module')
@Controller('my-home')
export class MyHomePluginInstanceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('plugin-instance')
  @Public()
  @ApiOperation({
    summary: 'Retrieve MyHomePluginInstance',
  })
  async getMyHomePluginInstance(
    @Query() queryDto: MyHomePluginInstanceQueryDto,
  ): Promise<ApiRes<any>> {
    if (queryDto.username && !queryDto.userId) {
      const queryUserId = await this.queryBus.execute(
        new UserInfoByUsernameQuery(queryDto.username),
      );
      if (!queryUserId) return ApiRes.error(400, 'Invalid query');
      queryDto.userId = queryUserId.id;
    }
    if (!queryDto.userId) return ApiRes.error(400, 'Invalid query');

    const pluginInstance = await this.queryBus.execute(
      new MyHomePluginInstanceByUserIdQuery(queryDto.userId),
    );
    if (!pluginInstance) return ApiRes.error(400, 'Invalid query');

    const result: {}[] = [];
    const pluginList: {
      id: string;
      name: string;
      version: string;
      componentName: string;
      status: Status;
    }[] = [];
    for (const item of pluginInstance) {
      let currentPlugin = pluginList.find(
        (plugin) => plugin.id === item.pluginId,
      );
      if (!currentPlugin) {
        const plugin = await this.queryBus.execute(
          new MyHomePluginByIdQuery(item.pluginId),
        );
        if (plugin) {
          currentPlugin = plugin;
          pluginList.push(plugin);
        }
      }
      if (currentPlugin) {
        result.push({
          id: item.id,
          pluginId: item.pluginId,
          meta: item.meta,
          order: item.order,
          name: currentPlugin.name,
          version: currentPlugin.version,
          componentName: currentPlugin.componentName,
        });
      }
    }
    return ApiRes.success(result);
  }
}
