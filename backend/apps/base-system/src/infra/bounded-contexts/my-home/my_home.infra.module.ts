import { Module } from '@nestjs/common';

import { MyHomeContactInfoReadPostgresRepository } from '@app/base-system/infra/bounded-contexts/my-home/repository/my_home_contact_info.read.pg.repository';
import { MyHomeContactInfoWritePostgresRepository } from '@app/base-system/infra/bounded-contexts/my-home/repository/my_home_contact_info.write.pg.repository';
import { UserInfoPostgresRepository } from '@app/base-system/infra/bounded-contexts/my-home/repository/user_info.read.pg.repository';
import {
  MyHomeContactInfoReadRepoPortToken,
  MyHomeContactInfoWriteRepoPortToken,
  UserInfoRepoPortToken,
} from '@app/base-system/lib/bounded-contexts/my-home/constants';
import { MyHomeModule } from '@app/base-system/lib/bounded-contexts/my-home/my_home.module';

const providers = [
  {
    provide: MyHomeContactInfoReadRepoPortToken,
    useClass: MyHomeContactInfoReadPostgresRepository,
  },
  {
    provide: MyHomeContactInfoWriteRepoPortToken,
    useClass: MyHomeContactInfoWritePostgresRepository,
  },
  { provide: UserInfoRepoPortToken, useClass: UserInfoPostgresRepository },
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
