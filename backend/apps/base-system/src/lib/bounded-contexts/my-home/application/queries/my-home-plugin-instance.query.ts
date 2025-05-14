import { IQuery } from '@nestjs/cqrs';

// 根据 userId 查询
export class MyHomePluginInstanceByUserIdQuery implements IQuery {
  constructor(public readonly userId: string) {}
}

// 根据 username 查询
export class MyHomePluginInstanceByUsernameQuery implements IQuery {
  constructor(public readonly username: string) {}
}
