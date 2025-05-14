import {
  MyContactInfoByIdQueryHandler,
  MyContactInfoByUserIdQueryHandler,
  MyContactInfoByUsernameQueryHandler,
} from './my-contact-info.handler';
import { UserInfoByUsernameQueryHandler } from './user-info-by-username.handler';

export const QueryHandlers = [
  MyContactInfoByIdQueryHandler,
  MyContactInfoByUserIdQueryHandler,
  MyContactInfoByUsernameQueryHandler,
  UserInfoByUsernameQueryHandler,
];
