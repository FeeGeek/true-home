import {
  MyHomeContactInfoByIdQueryHandler,
  MyHomeContactInfoByUserIdQueryHandler,
  MyHomeContactInfoByUsernameQueryHandler,
} from './my-home-contact-info.handler';
import { UserInfoByUsernameQueryHandler } from './user-info-by-username.handler';

export const QueryHandlers = [
  MyHomeContactInfoByIdQueryHandler,
  MyHomeContactInfoByUserIdQueryHandler,
  MyHomeContactInfoByUsernameQueryHandler,
  UserInfoByUsernameQueryHandler,
];
