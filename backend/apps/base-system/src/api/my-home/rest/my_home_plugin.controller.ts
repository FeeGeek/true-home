import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MyHomePluginQueryDto } from '@app/base-system/api/my-home/dto/my_home_plugin.dto';
import { MyHomePluginByIdQuery } from '@app/base-system/lib/bounded-contexts/my-home/application/queries/my-home-plugin.query';

import { Public } from '@lib/infra/decorators/public.decorator';
import { ApiRes } from '@lib/infra/rest/res.response';

@ApiTags('MyHome - Module')
@Controller('my-home')
export class MyHomePluginController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('plugin')
  @Public()
  @ApiOperation({
    summary: 'Retrieve MyHomePlugin',
  })
  async getMyHomePlugin(
    @Query() queryDto: MyHomePluginQueryDto,
  ): Promise<ApiRes<any>> {
    if (!queryDto.id) return ApiRes.error(400, 'Invalid query');

    const result = await this.queryBus.execute(
      new MyHomePluginByIdQuery(queryDto.id),
    );

    return ApiRes.success(result ?? []);
  }
}
