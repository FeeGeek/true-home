declare namespace MyHome {
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
  };
  type ContactInfo = {
    id: string;
    username: string;
    nickName: string;
    avatar: string;
  };
  type ContactInfoList = Api.Common.CommonRecord<ContactInfo & { records: Contact[] }>;

  type PluginInstanceListParams = {
    userId?: string;
    username?: string | null;
    status?: Api.Common.EnableStatus | null;
  };
  // type PluginInstance<T = any> = {
  //   id: string;
  //   name: string;
  //   version: string;
  //   componentName: string;
  //   userId: string;
  //   meta: Plugin.BasePlugin<T>;
  // };
  type PluginInstanceList = Api.Common.CommonRecord<{ records: Plugin.BasePlugin[] }>;
}
