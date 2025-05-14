import { Injectable } from '@nestjs/common';

import { MyHomePluginInstanceProperties } from '@app/base-system/lib/bounded-contexts/my-home/domain/entities/my-home-plugin-instance.entity';
import { MyHomePluginInstanceReadRepoPort } from '@app/base-system/lib/bounded-contexts/my-home/domain/ports/my-home-plugin-instance.repo.port';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

@Injectable()
export class MyHomePluginInstanceReadPgRepository
  implements MyHomePluginInstanceReadRepoPort
{
  constructor(private readonly prisma: PrismaService) {}

  async getMyHomePluginInstanceById(
    id: string,
  ): Promise<MyHomePluginInstanceProperties | null> {
    return this.prisma.myHomePluginInstance.findUnique({
      select: {
        id: true,
        pluginId: true,
        userId: true,
        meta: true,
        order: true,
        status: true,
      },
      where: {
        id,
        status: 'ENABLED',
      },
    });
  }

  async findMyHomePluginInstanceByUserId(
    userId: string,
  ): Promise<MyHomePluginInstanceProperties[] | null> {
    return this.prisma.myHomePluginInstance.findMany({
      select: {
        id: true,
        pluginId: true,
        userId: true,
        meta: true,
        order: true,
        status: true,
      },
      where: {
        userId,
        status: 'ENABLED',
      },
    });
  }

  async findMyHomePluginInstanceByUsername(
    username: string,
  ): Promise<MyHomePluginInstanceProperties[] | null> {
    const user = await this.prisma.sysUser.findUnique({
      select: {
        id: true,
      },
      where: {
        username,
      },
    });
    if (!user) {
      return null;
    }
    return this.findMyHomePluginInstanceByUserId(user.id);
  }
}
