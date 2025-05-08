import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MyHomeContactInfoWriteRepoPortToken } from '../../constants';
import { MyHomeContactInfoWrite } from '../../domain/entities/my-home-contact-info.entity';
import { MyHomeContactInfoWriteRepoPort } from '../../domain/ports/my-home-contact-info.repo.port';

import { MyHomeContactInfoCreateCommand } from './my-home-contact-info-create.command';

@CommandHandler(MyHomeContactInfoCreateCommand)
export class MyHomeContactInfoCreateHandler
  implements ICommandHandler<MyHomeContactInfoCreateCommand>
{
  constructor(
    @Inject(MyHomeContactInfoWriteRepoPortToken)
    private readonly writeRepository: MyHomeContactInfoWriteRepoPort,
  ) {}

  async execute(command: MyHomeContactInfoCreateCommand) {
    await this.writeRepository.createContactInfo(
      MyHomeContactInfoWrite.fromCreate({
        userId: command.userId,
        icon: command.icon,
        contactName: command.contactName,
        contact: command.contact,
        showContactName: command.showContactName,
        link: command.link,
        linkType: command.linkType,
        order: command.order,
        status: 'ENABLED',
        createdBy: command.uid,
        createdAt: new Date(),
      }),
    );
  }
}
