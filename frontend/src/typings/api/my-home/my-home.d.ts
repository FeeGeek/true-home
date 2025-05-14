declare namespace MyHome {
  type PluginInstanceListParams = {
    userId?: string;
    username?: string | null;
    status?: Api.Common.EnableStatus | null;
  };
  type PluginInstanceList = Api.Common.CommonRecord<Plugin.BasePlugin[]>;
}
