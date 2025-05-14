import { Injectable } from '@nestjs/common';

import { MyHomePluginProperties } from '@app/base-system/lib/bounded-contexts/my-home/domain/entities/my-home-plugin.entity';
import { MyHomePluginReadRepoPort } from '@app/base-system/lib/bounded-contexts/my-home/domain/ports/my-home-plugin.repo.port';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

@Injectable()
export class MyHomePluginReadPgRepository implements MyHomePluginReadRepoPort {
  constructor(private readonly prisma: PrismaService) {}

  async getMyHomePluginById(
    id: string,
  ): Promise<MyHomePluginProperties | null> {
    return this.prisma.myHomePlugin.findFirst({
      select: {
        id: true,
        name: true,
        version: true,
        componentName: true,
        status: true,
      },
      where: {
        id,
        status: 'ENABLED',
      },
    });
  }
}
