import { Injectable } from '@nestjs/common';

import { MyHomeContactInfoWrite } from '@app/base-system/lib/bounded-contexts/my-home/domain/entities/my-home-contact-info.entity';
import { MyHomeContactInfoWriteRepoPort } from '@app/base-system/lib/bounded-contexts/my-home/domain/ports/my-home-contact-info.repo.port';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

@Injectable()
export class MyHomeContactInfoWritePostgresRepository
  implements MyHomeContactInfoWriteRepoPort
{
  constructor(private prisma: PrismaService) {}

  async createContactInfo(command: MyHomeContactInfoWrite): Promise<void> {
    this.prisma.myHomeContactInfo.create({
      data: {
        userId: command.userId,
        icon: command.icon,
        contactName: command.contactName,
        contact: command.contact,
        showContactName: command.showContactName,
        link: command.link,
        linkType: command.linkType,
        order: command.order,
        status: command.status,
        createdBy: command.createdBy,
      },
    });
  }

  async updateContactInfo(command: MyHomeContactInfoWrite): Promise<void> {
    this.prisma.myHomeContactInfo.update({
      where: { id: command.id },
      data: {
        userId: command.userId,
        icon: command.icon,
        contactName: command.contactName,
        contact: command.contact,
        showContactName: command.showContactName,
        link: command.link,
        linkType: command.linkType,
        order: command.order,
        status: command.status,
        updatedBy: command.updatedBy,
      },
    });
  }

  async deleteContactInfo(id: string): Promise<void> {
    this.prisma.myHomeContactInfo.delete({
      where: { id },
    });
  }
}
