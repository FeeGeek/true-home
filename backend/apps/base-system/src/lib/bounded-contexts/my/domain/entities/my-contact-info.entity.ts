import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { Status } from '@prisma/client';

import {
  CreationAuditInfoProperties,
  UpdateAuditInfoProperties,
} from '@lib/typings/global';

export class MyContactInfoEntity implements IEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly icon: string,
    public readonly contactName: string,
    public readonly contact: string,
    public readonly showContactName: boolean,
    public readonly link: string,
    public readonly linkType: string,
    public readonly order: number,
    public readonly status: Status,
  ) {}
}

export class MyContactInfoDeletedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}

// 定义属性类型
export type MyContactInfoCreateProperties = Omit<MyContactInfoEntity, 'id'> &
  CreationAuditInfoProperties;
export type MyContactInfoUpdateProperties = Partial<MyContactInfoEntity> &
  Pick<MyContactInfoEntity, 'id'> &
  UpdateAuditInfoProperties;
export type MyContactInfoProperties = MyContactInfoEntity;

interface IMyContactInfo {
  commit(): void;
}

export class MyContactInfo extends AggregateRoot implements IMyContactInfo {
  id: string;
  userId: string;
  icon: string;
  contactName: string;
  contact: string;
  showContactName: boolean;
  link: string;
  linkType: string;
  order: number;
  status: Status;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;

  static fromCreate(properties: MyContactInfoCreateProperties): MyContactInfo {
    return Object.assign(new MyContactInfo(), properties);
  }

  static fromUpdate(properties: MyContactInfoUpdateProperties): MyContactInfo {
    return Object.assign(new MyContactInfo(), properties);
  }

  static fromProp(properties: MyContactInfoProperties): MyContactInfo {
    return Object.assign(new MyContactInfo(), properties);
  }

  async deleted() {
    this.apply(new MyContactInfoDeletedEvent(this.id, this.userId));
  }
}
