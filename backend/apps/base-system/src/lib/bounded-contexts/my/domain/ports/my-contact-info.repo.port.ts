import {
  MyContactInfoEntity,
  MyContactInfoProperties,
  MyContactInfo,
} from '../entities/my-contact-info.entity';

export interface MyContactInfoReadRepoPort {
  getContactInfoById(id: string): Promise<MyContactInfoProperties | null>;
  findContactInfoById(id: string): Promise<MyContactInfoEntity[]>;
  findContactInfoByUserId(userId: string): Promise<MyContactInfoEntity[]>;
  findContactInfoByUsername(username: string): Promise<MyContactInfoEntity[]>;
}

export interface MyContactInfoWriteRepoPort {
  createContactInfo(command: MyContactInfo): Promise<void>;
  updateContactInfo(command: MyContactInfo): Promise<void>;
  deleteContactInfo(id: string): Promise<void>;
}
