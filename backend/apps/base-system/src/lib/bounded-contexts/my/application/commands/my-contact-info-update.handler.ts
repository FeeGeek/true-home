import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  MyContactInfoReadRepoPortToken,
  MyContactInfoWriteRepoPortToken,
} from '../../constants';
import { MyContactInfo } from '../../domain/entities/my-contact-info.entity';
import {
  MyContactInfoReadRepoPort,
  MyContactInfoWriteRepoPort,
} from '../../domain/ports/my-contact-info.repo.port';

import { MyContactInfoUpdateCommand } from './my-contact-info-update.command';

@CommandHandler(MyContactInfoUpdateCommand)
export class MyContactInfoUpdateHandler
  implements ICommandHandler<MyContactInfoUpdateCommand>
{
  constructor(
    @Inject(MyContactInfoReadRepoPortToken)
    private readonly repoRepository: MyContactInfoReadRepoPort,
    @Inject(MyContactInfoWriteRepoPortToken)
    private readonly writeRepository: MyContactInfoWriteRepoPort,
  ) {}

  async execute(command: MyContactInfoUpdateCommand) {
    const existingContactInfo = await this.repoRepository.getContactInfoById(
      command.id,
    );
    if (!existingContactInfo) {
      throw new BadRequestException(
        `ContactInfo with id ${command.id} does not exist.`,
      );
    }
    const updatedContactInfo = MyContactInfo.fromUpdate({
      id: command.id,
      userId: command.userId ?? existingContactInfo.userId,
      icon: command.icon ?? existingContactInfo.icon,
      contactName: command.contactName ?? existingContactInfo.contactName,
      contact: command.contact ?? existingContactInfo.contact,
      showContactName:
        command.showContactName ?? existingContactInfo.showContactName,
      link: command.link ?? existingContactInfo.link,
      linkType: command.linkType ?? existingContactInfo.linkType,
      status: 'ENABLED',
      updatedBy: command.uid,
      updatedAt: new Date(),
    });
    await this.writeRepository.updateContactInfo(updatedContactInfo);
  }
}
