import { IQuery } from '@nestjs/cqrs';

// 根据 id 查询
export class MyHomePluginByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
