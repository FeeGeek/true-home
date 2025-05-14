import { IQuery } from '@nestjs/cqrs';

// 根据 id 查询
export class MyContactInfoByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

// 根据 userId 查询
export class MyContactInfoByUserIdQuery implements IQuery {
  constructor(public readonly userId: string) {}
}

// 根据 username 查询
export class MyContactInfoByUsernameQuery implements IQuery {
  constructor(public readonly username: string) {}
}
