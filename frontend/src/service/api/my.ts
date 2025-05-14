import { request } from '../request';

/** get my-home-user-info */
export function fetchGetMyHomeUserInfo(params: My.UserInfoParams) {
  return request<My.UserInfoResponse>({
    url: '/my/user-info',
    method: 'get',
    params
  });
}

/** get my-home-contact-info list */
export function fetchGetMyHomeContactInfoList(params: My.ContactInfoListParams) {
  return request<My.ContactInfoList>({
    url: '/my/contact-info',
    method: 'get',
    params
  });
}
