import { DynamicModule, Module, Provider } from '@nestjs/common';

import { QueryHandlers } from './application/queries';

@Module({})
export class MyHomeModule {
  static register(options: {
    inject: Provider[];
    imports: any[];
  }): DynamicModule {
    return {
      module: MyHomeModule,
      imports: [...options.imports],
      providers: [...QueryHandlers, ...options.inject],
      exports: [...QueryHandlers],
    };
  }
}
