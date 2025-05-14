import { request } from '../request';

/** get my-home-plugin-instance list */
export function fetchGetMyHomePluginInstanceList(params: MyHome.PluginInstanceListParams) {
  return request<MyHome.PluginInstanceList>({
    url: '/my-home/plugin-instance',
    method: 'get',
    params
  });
}
