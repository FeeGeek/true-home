import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { MyHomeContactInfoWrite } from '@app/base-system/lib/bounded-contexts/my-home/domain/entities/my-home-contact-info.entity';

import {
  MyHomeContactInfoReadRepoPortToken,
  MyHomeContactInfoWriteRepoPortToken,
} from '../../constants';
import {
  MyHomeContactInfoReadRepoPort,
  MyHomeContactInfoWriteRepoPort,
} from '../../domain/ports/my-home-contact-info.repo.port';

import { MyHomeContactInfoDeleteCommand } from './my-home-contact-info-delete.command';

@CommandHandler(MyHomeContactInfoDeleteCommand)
export class MyHomeContactInfoDeleteHandler
  implements ICommandHandler<MyHomeContactInfoDeleteCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(MyHomeContactInfoReadRepoPortToken)
    private readonly readRepository: MyHomeContactInfoReadRepoPort,
    @Inject(MyHomeContactInfoWriteRepoPortToken)
    private readonly writeRepository: MyHomeContactInfoWriteRepoPort,
  ) {}

  async execute(command: MyHomeContactInfoDeleteCommand) {
    const existingContactInfo = await this.readRepository.getContactInfoById(
      command.id,
    );
    if (!existingContactInfo) {
      throw new BadRequestException(
        `ContactInfo with id ${command.id} does not exist.`,
      );
    }

    const contactInfo = MyHomeContactInfoWrite.fromProp(existingContactInfo);
    await this.writeRepository.deleteContactInfo(contactInfo.id);
    await contactInfo.deleted();
    this.publisher.mergeObjectContext(contactInfo);
    contactInfo.commit();
  }
}
