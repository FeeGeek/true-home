import { AggregateRoot } from '@nestjs/cqrs';
import { Status } from '@prisma/client';

import {
  CreationAuditInfoProperties,
  UpdateAuditInfoProperties,
} from '@lib/typings/global';

import { MyHomeContactInfoDeletedEvent } from '../events/my-home-contact-info-delete.event';

export class MyHomeContactInfo {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly icon: string,
    public readonly contactName: string,
    public readonly contact: string,
    public readonly showContactName: boolean,
    public readonly link: string,
    public readonly linkType: string,
    public readonly status: Status,
  ) {}
}

interface IMyHomeContactInfo {
  commit(): void;
}

export class MyHomeContactInfoWrite
  extends AggregateRoot
  implements IMyHomeContactInfo
{
  id: string;
  userId: string;
  icon: string;
  contactName: string;
  contact: string;
  showContactName: boolean;
  link: string;
  linkType: string;
  status: Status;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;

  static fromCreate(
    properties: MyHomeContactInfoCreateProperties,
  ): MyHomeContactInfoWrite {
    return Object.assign(new MyHomeContactInfoWrite(), properties);
  }

  static fromUpdate(
    properties: MyHomeContactInfoUpdateProperties,
  ): MyHomeContactInfoWrite {
    return Object.assign(new MyHomeContactInfoWrite(), properties);
  }

  static fromProp(
    properties: MyHomeContactInfoProperties,
  ): MyHomeContactInfoWrite {
    return Object.assign(new MyHomeContactInfoWrite(), properties);
  }

  async deleted() {
    this.apply(new MyHomeContactInfoDeletedEvent(this.id, this.userId));
  }
}

// 定义属性类型
export type MyHomeContactInfoCreateProperties = Omit<MyHomeContactInfo, 'id'> &
  CreationAuditInfoProperties;
export type MyHomeContactInfoUpdateProperties = Partial<MyHomeContactInfo> &
  Pick<MyHomeContactInfo, 'id'> &
  UpdateAuditInfoProperties;
export type MyHomeContactInfoProperties = MyHomeContactInfo;
