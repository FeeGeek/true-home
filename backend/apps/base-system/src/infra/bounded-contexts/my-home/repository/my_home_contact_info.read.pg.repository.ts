import { Injectable } from '@nestjs/common';

import {
  MyHomeContactInfo,
  MyHomeContactInfoProperties,
  MyHomeContactInfoWrite,
} from '@app/base-system/lib/bounded-contexts/my-home/domain/entities/my-home-contact-info.entity';
import { MyHomeContactInfoReadRepoPort } from '@app/base-system/lib/bounded-contexts/my-home/domain/ports/my-home-contact-info.repo.port';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

@Injectable()
export class MyHomeContactInfoReadPostgresRepository
  implements MyHomeContactInfoReadRepoPort
{
  constructor(private prisma: PrismaService) {}

  async getContactInfoById(
    id: string,
  ): Promise<MyHomeContactInfoProperties | null> {
    const result = await this.prisma.myHomeContactInfo.findUnique({
      where: {
        id,
      },
    });
    return result ? MyHomeContactInfoWrite.fromProp(result) : null;
  }

  async findContactInfoById(id: string): Promise<MyHomeContactInfo[]> {
    return this.prisma.myHomeContactInfo.findMany({
      select: {
        id: true,
        userId: true,
        icon: true,
        contactName: true,
        contact: true,
        showContactName: true,
        link: true,
        linkType: true,
        status: true,
      },
      where: {
        id,
        status: 'ENABLED',
      },
    });
  }

  async findContactInfoByUserId(userId: string): Promise<MyHomeContactInfo[]> {
    return this.prisma.myHomeContactInfo.findMany({
      select: {
        id: true,
        userId: true,
        icon: true,
        contactName: true,
        contact: true,
        showContactName: true,
        link: true,
        linkType: true,
        status: true,
      },
      where: {
        userId,
        status: 'ENABLED',
      },
    });
  }

  async findContactInfoByUsername(
    username: string,
  ): Promise<MyHomeContactInfo[]> {
    const user = await this.prisma.sysUser.findFirst({
      select: { id: true },
      where: {
        username,
        status: 'ENABLED',
      },
    });
    if (!user) return [];
    return this.prisma.myHomeContactInfo.findMany({
      select: {
        id: true,
        userId: true,
        icon: true,
        contactName: true,
        contact: true,
        showContactName: true,
        link: true,
        linkType: true,
        status: true,
      },
      where: {
        userId: user.id,
        status: 'ENABLED',
      },
    });
  }
}
