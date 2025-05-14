import { Prisma } from '@prisma/client';

import { prisma } from '../helper';

export const initMyHomePluginInstance = async () => {
  const data: Prisma.MyHomePluginInstanceCreateInput[] = [
    {
      id: '1',
      pluginId: '1',
      userId: '1',
      meta: {
        title: '排行榜',
        columns: [
          { key: 'rankName', title: '排名' },
          { key: 'nickName', title: '昵称' },
          { key: 'startDate', title: '上榜时间' },
        ],
        list: [
          {
            id: 1,
            rankName: '1',
            nickName: '昵称1',
            startDate: '2025-04-01',
          },
          {
            id: 2,
            rankName: '2',
            nickName: '昵称2',
            startDate: '2025-04-01',
          },
          {
            id: 3,
            rankName: '3',
            nickName: '昵称3',
            startDate: '2025-04-01',
          },
          {
            id: 4,
            rankName: '4',
            nickName: '昵称4',
            startDate: '2025-04-01',
          },
          {
            id: 5,
            rankName: '5',
            nickName: '昵称5',
            startDate: '2025-04-01',
          },
        ],
      },
      order: 0,
      status: 'ENABLED',
      createdBy: '-1',
    },
    {
      id: '2',
      pluginId: '1',
      userId: '1',
      meta: {
        title: '历史记录',
        columns: [
          { key: 'nickName', title: '昵称' },
          { key: 'startDate', title: '上榜时间' },
          { key: 'endDate', title: '落榜时间' },
        ],
        list: [
          {
            nickName: '昵称1',
            startDate: '2025-04-01',
            endDate: '2025-04-05',
          },
          {
            nickName: '昵称2',
            startDate: '2025-03-15',
            endDate: '2025-04-05',
          },
          {
            nickName: '昵称3',
            startDate: '2025-03-01',
            endDate: '2025-04-05',
          },
          {
            nickName: '昵称4',
            startDate: '2025-02-20',
            endDate: '2025-04-05',
          },
          {
            nickName: '昵称5',
            startDate: '2025-02-10',
            endDate: '2025-04-05',
          },
        ],
      },
      order: 0,
      status: 'ENABLED',
      createdBy: '-1',
    },
  ];

  return prisma.myHomePluginInstance.createMany({ data });
};
