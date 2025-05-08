import { DynamicModule, Module, Provider } from '@nestjs/common';

import { PubSubCommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { Services } from './application/services';

@Module({})
export class MyHomeModule {
  static register(options: {
    inject: Provider[];
    imports: any[];
  }): DynamicModule {
    return {
      module: MyHomeModule,
      imports: [...options.imports],
      providers: [
        ...PubSubCommandHandlers,
        ...QueryHandlers,
        ...Services,
        ...options.inject,
      ],
      exports: [...QueryHandlers, ...Services],
    };
  }
}
