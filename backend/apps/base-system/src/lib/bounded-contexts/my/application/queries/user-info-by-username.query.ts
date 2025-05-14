import { IQuery } from '@nestjs/cqrs';

export class UserInfoByUsernameQuery implements IQuery {
  constructor(public readonly username: string) {}
}
