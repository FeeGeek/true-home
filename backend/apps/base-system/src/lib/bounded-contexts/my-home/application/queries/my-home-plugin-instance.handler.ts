import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MyHomePluginInstanceReadRepoPortToken } from '../../constants';
import { MyHomePluginInstanceReadRepoPort } from '../../domain/ports/my-home-plugin-instance.repo.port';

import {
  MyHomePluginInstanceByUserIdQuery,
  MyHomePluginInstanceByUsernameQuery,
} from './my-home-plugin-instance.query';

@QueryHandler(MyHomePluginInstanceByUserIdQuery)
export class MyHomePluginInstanceByUserIdQueryHandler
  implements IQueryHandler<MyHomePluginInstanceByUserIdQuery>
{
  constructor(
    @Inject(MyHomePluginInstanceReadRepoPortToken)
    private readonly repository: MyHomePluginInstanceReadRepoPort,
  ) {}

  async execute(query: MyHomePluginInstanceByUserIdQuery) {
    return this.repository.findMyHomePluginInstanceByUserId(query.userId);
  }
}

@QueryHandler(MyHomePluginInstanceByUsernameQuery)
export class MyHomePluginInstanceByUsernameQueryHandler
  implements IQueryHandler<MyHomePluginInstanceByUsernameQuery>
{
  constructor(
    @Inject(MyHomePluginInstanceReadRepoPortToken)
    private readonly repository: MyHomePluginInstanceReadRepoPort,
  ) {}

  async execute(query: MyHomePluginInstanceByUsernameQuery) {
    return this.repository.findMyHomePluginInstanceByUsername(query.username);
  }
}
