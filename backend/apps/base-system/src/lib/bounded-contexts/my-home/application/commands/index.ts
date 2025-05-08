import { MyHomeContactInfoCreateHandler } from './my-home-contact-info-create.handler';
import { MyHomeContactInfoDeleteHandler } from './my-home-contact-info-delete.handler';

export const PubSubCommandHandlers = [
  MyHomeContactInfoCreateHandler,
  MyHomeContactInfoDeleteHandler,
];
