import { DynamicModule, Module, Provider } from '@nestjs/common';

import { PubSubCommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';

@Module({})
export class MyModule {
  static register(options: {
    inject: Provider[];
    imports: any[];
  }): DynamicModule {
    return {
      module: MyModule,
      imports: [...options.imports],
      providers: [
        ...PubSubCommandHandlers,
        ...QueryHandlers,
        ...options.inject,
      ],
      exports: [...QueryHandlers],
    };
  }
}
