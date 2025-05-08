import { IEvent } from '@nestjs/cqrs';

export class MyHomeContactInfoDeletedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
