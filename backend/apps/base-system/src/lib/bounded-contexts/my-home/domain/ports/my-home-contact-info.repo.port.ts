import {
  MyHomeContactInfo,
  MyHomeContactInfoProperties,
  MyHomeContactInfoWrite,
} from '../entities/my-home-contact-info.entity';

export interface MyHomeContactInfoReadRepoPort {
  getContactInfoById(id: string): Promise<MyHomeContactInfoProperties | null>;
  findContactInfoById(id: string): Promise<MyHomeContactInfo[]>;
  findContactInfoByUserId(userId: string): Promise<MyHomeContactInfo[]>;
  findContactInfoByUsername(username: string): Promise<MyHomeContactInfo[]>;
}

export interface MyHomeContactInfoWriteRepoPort {
  createContactInfo(command: MyHomeContactInfoWrite): Promise<void>;
  updateContactInfo(command: MyHomeContactInfoWrite): Promise<void>;
  deleteContactInfo(id: string): Promise<void>;
}
