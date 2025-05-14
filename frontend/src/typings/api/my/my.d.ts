declare namespace My {
  type UserInfoParams = {
    username: string;
  };

  type UserInfo = {
    id: string;
    username: string;
    nickName: string;
    avatar: string;
  };
  type UserInfoResponse = Api.Common.CommonRecord<UserInfo>;

  type ContactInfoListParams = {
    id?: string | null;
    userId?: string | null;
    username?: string | null;
    status?: Api.Common.EnableStatus | null;
  };
  type Contact = {
    id: string;
    userId: string;
    icon: string;
    contactName: string;
    contact: string;
    showContactName: boolean;
    link: string;
    linkType: string;
    order: number;
  };
  type ContactInfoList = Api.Common.CommonRecord<Contact[]>;
}
