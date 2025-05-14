import { prisma } from './helper';
import { initMyContactInfo } from './my/myContactInfo';
import { initMyHomePlugin } from './my/myHomePlugin';
import { initMyHomePluginInstance } from './my/myHomePluginInstance';
import { initCasbinRule } from './sys/casbinRule';
import { initSysDomain } from './sys/sysDomain';
import { initSysMenu } from './sys/sysMenu';
import { initSysRole } from './sys/sysRole';
import { initSysRoleMenu } from './sys/sysRoleMenu';
import { initSysUser } from './sys/sysUser';
import { initSysUserRole } from './sys/sysUserRole';

const run = async () => {
  await initSysUser();
  await initSysRole();
  await initSysMenu();
  await initSysDomain();
  await initSysUserRole();
  await initSysRoleMenu();
  await initCasbinRule();

  await initMyContactInfo();
  await initMyHomePlugin();
  await initMyHomePluginInstance();
};

(async () => {
  const date = new Date().getTime();
  console.log('Database initialization start');
  await run();
  console.log('Database initialization complete');
  console.log('Duration:', new Date().getTime() - date, 'ms');
  // 关闭数据库连接
  await prisma.$disconnect();
})();
