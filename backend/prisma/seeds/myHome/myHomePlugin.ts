import { Prisma } from '@prisma/client';

import { prisma } from '../helper';

export const initMyHomePlugin = async () => {
  const data: Prisma.MyHomePluginCreateInput[] = [
    {
      id: '1',
      name: '基础表格',
      version: '1.0.0',
      componentName: 'BaseTable',
      status: 'DISABLED',
      createdAt: new Date('2000-01-01T00:00:00.000Z'),
      createdBy: '-1',
    },
  ];

  return prisma.myHomePlugin.createMany({ data });
};
