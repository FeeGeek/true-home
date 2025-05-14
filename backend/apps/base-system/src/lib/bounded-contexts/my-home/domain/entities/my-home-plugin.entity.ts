import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { Status } from '@prisma/client';

import {
  CreationAuditInfoProperties,
  UpdateAuditInfoProperties,
} from '@lib/typings/global';

export class MyHomePluginEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly version: string,
    public readonly componentName: string,
    public readonly status: Status,
  ) {}
}

export class MyHomePluginDeletedEvent implements IEvent {
  constructor(public readonly id: string) {}
}

// 定义属性类型
export type MyHomePluginCreateProperties = Omit<MyHomePluginEntity, 'id'> &
  CreationAuditInfoProperties;
export type MyHomePluginUpdateProperties = Partial<MyHomePluginEntity> &
  Pick<MyHomePluginEntity, 'id'> &
  UpdateAuditInfoProperties;
export type MyHomePluginProperties = MyHomePluginEntity;

interface IMyHomePlugin {
  commit(): void;
}

export class MyHomePlugin extends AggregateRoot implements IMyHomePlugin {
  id: string;
  name: string;
  version: string;
  componentName: string;
  status: Status;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;

  static fromCreate(properties: MyHomePluginCreateProperties): MyHomePlugin {
    return Object.assign(new MyHomePlugin(), properties);
  }

  static fromUpdate(properties: MyHomePluginUpdateProperties): MyHomePlugin {
    return Object.assign(new MyHomePlugin(), properties);
  }

  static fromProp(properties: MyHomePluginProperties): MyHomePlugin {
    return Object.assign(new MyHomePlugin(), properties);
  }

  async deleted() {
    this.apply(new MyHomePluginDeletedEvent(this.id));
  }
}
