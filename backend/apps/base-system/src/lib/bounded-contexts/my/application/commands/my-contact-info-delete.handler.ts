import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { MyContactInfo } from '@app/base-system/lib/bounded-contexts/my/domain/entities/my-contact-info.entity';

import {
  MyContactInfoReadRepoPortToken,
  MyContactInfoWriteRepoPortToken,
} from '../../constants';
import {
  MyContactInfoReadRepoPort,
  MyContactInfoWriteRepoPort,
} from '../../domain/ports/my-contact-info.repo.port';

import { MyContactInfoDeleteCommand } from './my-contact-info-delete.command';

@CommandHandler(MyContactInfoDeleteCommand)
export class MyContactInfoDeleteHandler
  implements ICommandHandler<MyContactInfoDeleteCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(MyContactInfoReadRepoPortToken)
    private readonly readRepository: MyContactInfoReadRepoPort,
    @Inject(MyContactInfoWriteRepoPortToken)
    private readonly writeRepository: MyContactInfoWriteRepoPort,
  ) {}

  async execute(command: MyContactInfoDeleteCommand) {
    const existingContactInfo = await this.readRepository.getContactInfoById(
      command.id,
    );
    if (!existingContactInfo) {
      throw new BadRequestException(
        `ContactInfo with id ${command.id} does not exist.`,
      );
    }

    const contactInfo = MyContactInfo.fromProp(existingContactInfo);
    await this.writeRepository.deleteContactInfo(contactInfo.id);
    await contactInfo.deleted();
    this.publisher.mergeObjectContext(contactInfo);
    contactInfo.commit();
  }
}
