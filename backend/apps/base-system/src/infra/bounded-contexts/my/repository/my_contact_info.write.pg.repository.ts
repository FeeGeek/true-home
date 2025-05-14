import { Injectable } from '@nestjs/common';

import { MyContactInfo } from '@app/base-system/lib/bounded-contexts/my/domain/entities/my-contact-info.entity';
import { MyContactInfoWriteRepoPort } from '@app/base-system/lib/bounded-contexts/my/domain/ports/my-contact-info.repo.port';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

@Injectable()
export class MyContactInfoWritePostgresRepository
  implements MyContactInfoWriteRepoPort
{
  constructor(private prisma: PrismaService) {}

  async createContactInfo(command: MyContactInfo): Promise<void> {
    this.prisma.myContactInfo.create({
      data: {
        userId: command.userId,
        icon: command.icon,
        contactName: command.contactName,
        contact: command.contact,
        showContactName: command.showContactName,
        link: command.link,
        linkType: command.linkType,
        status: command.status,
        createdBy: command.createdBy,
      },
    });
  }

  async updateContactInfo(command: MyContactInfo): Promise<void> {
    this.prisma.myContactInfo.update({
      where: { id: command.id },
      data: {
        userId: command.userId,
        icon: command.icon,
        contactName: command.contactName,
        contact: command.contact,
        showContactName: command.showContactName,
        link: command.link,
        linkType: command.linkType,
        status: command.status,
        updatedBy: command.updatedBy,
      },
    });
  }

  async deleteContactInfo(id: string): Promise<void> {
    this.prisma.myContactInfo.delete({
      where: { id },
    });
  }
}
