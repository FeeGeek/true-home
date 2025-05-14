import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { Status } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

import {
  CreationAuditInfoProperties,
  UpdateAuditInfoProperties,
} from '@lib/typings/global';

export class MyHomePluginInstanceEntity {
  constructor(
    public readonly id: string,
    public readonly pluginId: string,
    public readonly userId: string,
    public readonly meta: JsonValue | null,
    public readonly order: number,
    public readonly status: Status,
  ) {}
}

export class MyHomePluginInstanceDeletedEvent implements IEvent {
  constructor(public readonly id: string) {}
}

// 定义属性类型
export type MyHomePluginInstanceCreateProperties = Omit<
  MyHomePluginInstanceEntity,
  'id'
> &
  CreationAuditInfoProperties;
export type MyHomePluginInstanceUpdateProperties =
  Partial<MyHomePluginInstanceEntity> &
    Pick<MyHomePluginInstanceEntity, 'id'> &
    UpdateAuditInfoProperties;
export type MyHomePluginInstanceProperties = MyHomePluginInstanceEntity;

interface IMyHomePluginInstance {
  commit(): void;
}

export class MyHomePluginInstance
  extends AggregateRoot
  implements IMyHomePluginInstance
{
  id: string;
  pluginId: string;
  userId: string;
  meta: JsonValue | null;
  order: number;
  status: Status;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;

  static fromCreate(
    properties: MyHomePluginInstanceCreateProperties,
  ): MyHomePluginInstance {
    return Object.assign(new MyHomePluginInstance(), properties);
  }

  static fromUpdate(
    properties: MyHomePluginInstanceUpdateProperties,
  ): MyHomePluginInstance {
    return Object.assign(new MyHomePluginInstance(), properties);
  }

  static fromProp(
    properties: MyHomePluginInstanceProperties,
  ): MyHomePluginInstance {
    return Object.assign(new MyHomePluginInstance(), properties);
  }

  async deleted() {
    this.apply(new MyHomePluginInstanceDeletedEvent(this.id));
  }
}
