import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MyHomePluginReadRepoPortToken } from '../../constants';
import { MyHomePluginReadRepoPort } from '../../domain/ports/my-home-plugin.repo.port';

import { MyHomePluginByIdQuery } from './my-home-plugin.query';

@QueryHandler(MyHomePluginByIdQuery)
export class MyHomePluginByIdQueryHandler
  implements IQueryHandler<MyHomePluginByIdQuery>
{
  constructor(
    @Inject(MyHomePluginReadRepoPortToken)
    private readonly repository: MyHomePluginReadRepoPort,
  ) {}

  async execute(query: MyHomePluginByIdQuery) {
    return this.repository.getMyHomePluginById(query.id);
  }
}
