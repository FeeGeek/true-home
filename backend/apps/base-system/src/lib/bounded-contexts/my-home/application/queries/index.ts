import {
  MyHomePluginInstanceByUserIdQueryHandler,
  MyHomePluginInstanceByUsernameQueryHandler,
} from './my-home-plugin-instance.handler';
import { MyHomePluginByIdQueryHandler } from './my-home-plugin.handler';

export const QueryHandlers = [
  MyHomePluginByIdQueryHandler,
  MyHomePluginInstanceByUserIdQueryHandler,
  MyHomePluginInstanceByUsernameQueryHandler,
];
