import { Injectable } from '@nestjs/common';

import {
  MyContactInfoEntity,
  MyContactInfoProperties,
  MyContactInfo,
} from '@app/base-system/lib/bounded-contexts/my/domain/entities/my-contact-info.entity';
import { MyContactInfoReadRepoPort } from '@app/base-system/lib/bounded-contexts/my/domain/ports/my-contact-info.repo.port';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

@Injectable()
export class MyContactInfoReadPostgresRepository
  implements MyContactInfoReadRepoPort
{
  constructor(private prisma: PrismaService) {}

  async getContactInfoById(
    id: string,
  ): Promise<MyContactInfoProperties | null> {
    const result = await this.prisma.myContactInfo.findUnique({
      where: {
        id,
      },
    });
    return result ? MyContactInfo.fromProp(result) : null;
  }

  async findContactInfoById(id: string): Promise<MyContactInfoEntity[]> {
    return this.prisma.myContactInfo
      .findMany({
        select: {
          id: true,
          userId: true,
          icon: true,
          contactName: true,
          contact: true,
          showContactName: true,
          link: true,
          linkType: true,
          order: true,
          status: true,
        },
        where: {
          id,
          status: 'ENABLED',
        },
      })
      .then((r) => r.sort((a, b) => a.order - b.order));
  }

  async findContactInfoByUserId(
    userId: string,
  ): Promise<MyContactInfoEntity[]> {
    return this.prisma.myContactInfo
      .findMany({
        select: {
          id: true,
          userId: true,
          icon: true,
          contactName: true,
          contact: true,
          showContactName: true,
          link: true,
          linkType: true,
          order: true,
          status: true,
        },
        where: {
          userId,
          status: 'ENABLED',
        },
      })
      .then((r) => r.sort((a, b) => a.order - b.order));
  }

  async findContactInfoByUsername(
    username: string,
  ): Promise<MyContactInfoEntity[]> {
    const user = await this.prisma.sysUser.findFirst({
      select: { id: true },
      where: {
        username,
        status: 'ENABLED',
      },
    });
    if (!user) return [];
    return this.prisma.myContactInfo
      .findMany({
        select: {
          id: true,
          userId: true,
          icon: true,
          contactName: true,
          contact: true,
          showContactName: true,
          link: true,
          linkType: true,
          order: true,
          status: true,
        },
        where: {
          userId: user.id,
          status: 'ENABLED',
        },
      })
      .then((r) => r.sort((a, b) => a.order - b.order));
  }
}
