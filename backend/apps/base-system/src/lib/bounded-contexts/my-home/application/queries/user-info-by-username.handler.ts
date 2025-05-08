import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { UserInfoRepoPort } from '@app/base-system/lib/bounded-contexts/my-home/domain/ports/user-info.repo.port';

import { UserInfoRepoPortToken } from '../../constants';
import { SysUser } from '../../domain/entities/sys-user.entity';

import { UserInfoByUsernameQuery } from './user-info-by-username.query';

@QueryHandler(UserInfoByUsernameQuery)
export class UserInfoByUsernameQueryHandler
  implements IQueryHandler<UserInfoByUsernameQuery, SysUser | null>
{
  constructor(
    @Inject(UserInfoRepoPortToken)
    private readonly repository: UserInfoRepoPort,
  ) {}

  async execute(query: UserInfoByUsernameQuery): Promise<SysUser | null> {
    return this.repository.getUserDataByUsername(query.username);
  }
}
