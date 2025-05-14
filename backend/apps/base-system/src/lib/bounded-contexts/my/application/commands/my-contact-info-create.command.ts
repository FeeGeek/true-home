import { Status } from '@prisma/client';

export class MyContactInfoCreateCommand {
  constructor(
    public readonly uid: string,
    public readonly userId: string,
    public readonly icon: string,
    public readonly contactName: string,
    public readonly contact: string,
    public readonly showContactName: boolean,
    public readonly link: string,
    public readonly linkType: string,
    public readonly status: Status,
  ) {}
}
