import { request } from '../request';

/** get my-home-user-info */
export function fetchGetMyHomeUserInfo(params: MyHome.UserInfoParams) {
  return request<MyHome.UserInfoResponse>({
    url: '/my-home/user-info',
    method: 'get',
    params
  });
}

/** get my-home-contact-info list */
export function fetchGetMyHomeContactInfoList(params: MyHome.ContactInfoListParams) {
  return request<MyHome.ContactInfoList>({
    url: '/my-home/contact-info',
    method: 'get',
    params
  });
}

/** get my-home-plugin-instance list */
export function fetchGetMyHomePluginInstanceList(params: MyHome.PluginInstanceListParams) {
  return request<MyHome.PluginInstanceList>({
    url: '/my-home/plugin-instance',
    method: 'get',
    params
  });
}
