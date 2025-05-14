import { MyContactInfoCreateHandler } from './my-contact-info-create.handler';
import { MyContactInfoDeleteHandler } from './my-contact-info-delete.handler';

export const PubSubCommandHandlers = [
  MyContactInfoCreateHandler,
  MyContactInfoDeleteHandler,
];
