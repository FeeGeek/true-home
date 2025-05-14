import { Prisma } from '@prisma/client';

import { prisma } from '../helper';

export const initMyHomePlugin = async () => {
  const data: Prisma.MyHomePluginCreateInput[] = [
    {
      id: '1',
      name: '基础表格',
      version: '0.0.1',
      componentName: 'BaseTable',
      status: 'ENABLED',
      createdBy: '-1',
    },
  ];

  return prisma.myHomePlugin.createMany({ data });
};
