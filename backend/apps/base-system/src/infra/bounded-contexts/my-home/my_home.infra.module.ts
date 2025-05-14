import { Module } from '@nestjs/common';

import { MyHomePluginReadPgRepository } from '@app/base-system/infra/bounded-contexts/my-home/repository/my_home_plugin.read.pg.repository';
import { MyHomePluginInstanceReadPgRepository } from '@app/base-system/infra/bounded-contexts/my-home/repository/my_home_plugin_instance.read.pg.repository';
import {
  MyHomePluginInstanceReadRepoPortToken,
  MyHomePluginReadRepoPortToken,
} from '@app/base-system/lib/bounded-contexts/my-home/constants';
import { MyHomeModule } from '@app/base-system/lib/bounded-contexts/my-home/my_home.module';

const providers = [
  {
    provide: MyHomePluginReadRepoPortToken,
    useClass: MyHomePluginReadPgRepository,
  },
  {
    provide: MyHomePluginInstanceReadRepoPortToken,
    useClass: MyHomePluginInstanceReadPgRepository,
  },
];

@Module({
  imports: [
    MyHomeModule.register({
      inject: [...providers],
      imports: [],
    }),
  ],
  exports: [MyHomeModule],
})
export class MyHomeInfraModule {}
