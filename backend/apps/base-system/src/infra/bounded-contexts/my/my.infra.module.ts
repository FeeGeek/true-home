import { Module } from '@nestjs/common';

import { MyContactInfoReadPostgresRepository } from '@app/base-system/infra/bounded-contexts/my/repository/my_contact_info.read.pg.repository';
import { MyContactInfoWritePostgresRepository } from '@app/base-system/infra/bounded-contexts/my/repository/my_contact_info.write.pg.repository';
import { UserInfoPostgresRepository } from '@app/base-system/infra/bounded-contexts/my/repository/user_info.read.pg.repository';
import {
  MyContactInfoReadRepoPortToken,
  MyContactInfoWriteRepoPortToken,
  UserInfoRepoPortToken,
} from '@app/base-system/lib/bounded-contexts/my/constants';
import { MyModule } from '@app/base-system/lib/bounded-contexts/my/my.module';

const providers = [
  {
    provide: MyContactInfoReadRepoPortToken,
    useClass: MyContactInfoReadPostgresRepository,
  },
  {
    provide: MyContactInfoWriteRepoPortToken,
    useClass: MyContactInfoWritePostgresRepository,
  },
  { provide: UserInfoRepoPortToken, useClass: UserInfoPostgresRepository },
];

@Module({
  imports: [
    MyModule.register({
      inject: [...providers],
      imports: [],
    }),
  ],
  exports: [MyModule],
})
export class MyInfraModule {}
