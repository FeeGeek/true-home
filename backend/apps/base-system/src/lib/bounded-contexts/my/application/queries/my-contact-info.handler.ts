import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MyContactInfoReadRepoPortToken } from '../../constants';
import { MyContactInfoReadRepoPort } from '../../domain/ports/my-contact-info.repo.port';

import {
  MyContactInfoByIdQuery,
  MyContactInfoByUserIdQuery,
  MyContactInfoByUsernameQuery,
} from './my-contact-info.query';

@QueryHandler(MyContactInfoByIdQuery)
export class MyContactInfoByIdQueryHandler
  implements IQueryHandler<MyContactInfoByIdQuery>
{
  constructor(
    @Inject(MyContactInfoReadRepoPortToken)
    private readonly repository: MyContactInfoReadRepoPort,
  ) {}

  async execute(query: MyContactInfoByIdQuery) {
    return this.repository.findContactInfoById(query.id);
  }
}

@QueryHandler(MyContactInfoByUserIdQuery)
export class MyContactInfoByUserIdQueryHandler
  implements IQueryHandler<MyContactInfoByUserIdQuery>
{
  constructor(
    @Inject(MyContactInfoReadRepoPortToken)
    private readonly repository: MyContactInfoReadRepoPort,
  ) {}

  async execute(query: MyContactInfoByUserIdQuery) {
    return this.repository.findContactInfoByUserId(query.userId);
  }
}

@QueryHandler(MyContactInfoByUsernameQuery)
export class MyContactInfoByUsernameQueryHandler
  implements IQueryHandler<MyContactInfoByUsernameQuery>
{
  constructor(
    @Inject(MyContactInfoReadRepoPortToken)
    private readonly repository: MyContactInfoReadRepoPort,
  ) {}

  async execute(query: MyContactInfoByUsernameQuery) {
    return this.repository.findContactInfoByUsername(query.username);
  }
}
