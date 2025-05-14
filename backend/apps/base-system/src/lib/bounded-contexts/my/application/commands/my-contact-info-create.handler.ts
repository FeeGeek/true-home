import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MyContactInfoWriteRepoPortToken } from '../../constants';
import { MyContactInfo } from '../../domain/entities/my-contact-info.entity';
import { MyContactInfoWriteRepoPort } from '../../domain/ports/my-contact-info.repo.port';

import { MyContactInfoCreateCommand } from './my-contact-info-create.command';

@CommandHandler(MyContactInfoCreateCommand)
export class MyContactInfoCreateHandler
  implements ICommandHandler<MyContactInfoCreateCommand>
{
  constructor(
    @Inject(MyContactInfoWriteRepoPortToken)
    private readonly writeRepository: MyContactInfoWriteRepoPort,
  ) {}

  async execute(command: MyContactInfoCreateCommand) {
    await this.writeRepository.createContactInfo(
      MyContactInfo.fromCreate({
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
