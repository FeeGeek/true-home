import { SysUser } from '../entities/sys-user.entity';

/**
 * 定义用户信息仓储端口接口，规定获取用户信息相关的方法
 */
export interface UserInfoRepoPort {
  /**
   * 根据用户名获取用户数据
   * @param username - 用户名
   * @returns 包含用户信息的 Promise，若未找到则返回 null
   */
  getUserDataByUsername(username: string): Promise<SysUser | null>;
}
