import { Injectable } from '@nestjs/common';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

import { MyHomeContactInfo } from '../../domain/entities/my-home-contact-info.entity';

@Injectable()
export class MyHomeContactInfoAppService {
  constructor(private readonly prisma: PrismaService) {}

  async getContactInfoById(id: string): Promise<MyHomeContactInfo[]> {
    return this.prisma.myHomeContactInfo.findMany({
      where: {
        id,
        status: 'ENABLED',
      },
    });
  }
}
