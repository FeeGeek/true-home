import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MyHomeContactInfoReadRepoPortToken } from '../../constants';
import { MyHomeContactInfoReadRepoPort } from '../../domain/ports/my-home-contact-info.repo.port';

import {
  MyHomeContactInfoByIdQuery,
  MyHomeContactInfoByUserIdQuery,
  MyHomeContactInfoByUsernameQuery,
} from './my-home-contact-info.query';

@QueryHandler(MyHomeContactInfoByIdQuery)
export class MyHomeContactInfoByIdQueryHandler
  implements IQueryHandler<MyHomeContactInfoByIdQuery>
{
  constructor(
    @Inject(MyHomeContactInfoReadRepoPortToken)
    private readonly repository: MyHomeContactInfoReadRepoPort,
  ) {}

  async execute(query: MyHomeContactInfoByIdQuery) {
    return this.repository.findContactInfoById(query.id);
  }
}

@QueryHandler(MyHomeContactInfoByUserIdQuery)
export class MyHomeContactInfoByUserIdQueryHandler
  implements IQueryHandler<MyHomeContactInfoByUserIdQuery>
{
  constructor(
    @Inject(MyHomeContactInfoReadRepoPortToken)
    private readonly repository: MyHomeContactInfoReadRepoPort,
  ) {}

  async execute(query: MyHomeContactInfoByUserIdQuery) {
    return this.repository.findContactInfoByUserId(query.userId);
  }
}

@QueryHandler(MyHomeContactInfoByUsernameQuery)
export class MyHomeContactInfoByUsernameQueryHandler
  implements IQueryHandler<MyHomeContactInfoByUsernameQuery>
{
  constructor(
    @Inject(MyHomeContactInfoReadRepoPortToken)
    private readonly repository: MyHomeContactInfoReadRepoPort,
  ) {}

  async execute(query: MyHomeContactInfoByUsernameQuery) {
    return this.repository.findContactInfoByUsername(query.username);
  }
}
