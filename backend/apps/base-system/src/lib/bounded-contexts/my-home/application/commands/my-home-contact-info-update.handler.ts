import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  MyHomeContactInfoReadRepoPortToken,
  MyHomeContactInfoWriteRepoPortToken,
} from '../../constants';
import { MyHomeContactInfoWrite } from '../../domain/entities/my-home-contact-info.entity';
import {
  MyHomeContactInfoReadRepoPort,
  MyHomeContactInfoWriteRepoPort,
} from '../../domain/ports/my-home-contact-info.repo.port';

import { MyHomeContactInfoUpdateCommand } from './my-home-contact-info-update.command';

@CommandHandler(MyHomeContactInfoUpdateCommand)
export class MyHomeContactInfoUpdateHandler
  implements ICommandHandler<MyHomeContactInfoUpdateCommand>
{
  constructor(
    @Inject(MyHomeContactInfoReadRepoPortToken)
    private readonly repoRepository: MyHomeContactInfoReadRepoPort,
    @Inject(MyHomeContactInfoWriteRepoPortToken)
    private readonly writeRepository: MyHomeContactInfoWriteRepoPort,
  ) {}

  async execute(command: MyHomeContactInfoUpdateCommand) {
    const existingContactInfo = await this.repoRepository.getContactInfoById(
      command.id,
    );
    if (!existingContactInfo) {
      throw new BadRequestException(
        `ContactInfo with id ${command.id} does not exist.`,
      );
    }
    const updatedContactInfo = MyHomeContactInfoWrite.fromUpdate({
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
