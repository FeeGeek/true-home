import { Injectable } from '@nestjs/common';

import { SysUser } from '@app/base-system/lib/bounded-contexts/my-home/domain/entities/sys-user.entity';
import { UserInfoRepoPort } from '@app/base-system/lib/bounded-contexts/my-home/domain/ports/user-info.repo.port';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

/**
 * 用户信息仓储实现类，实现 UserInfoRepoPort 接口
 */
@Injectable()
export class UserInfoPostgresRepository implements UserInfoRepoPort {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 根据用户名获取用户数据
   * @param username - 用户名
   * @returns 包含用户信息的 Promise，若未找到则返回 null
   */
  async getUserDataByUsername(username: string): Promise<SysUser | null> {
    const user = await this.prisma.sysUser.findFirst({
      select: {
        id: true,
        username: true,
        nickName: true,
        avatar: true,
      },
      where: {
        username,
        status: 'ENABLED',
      },
    });

    if (user) {
      return new SysUser(user.id, user.username, user.nickName, user.avatar);
    }
    return null;
  }
}
