import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { UserModule } from './user/user.module';
import { UserPatternModule } from './user-pattern/user-pattern.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        UserPatternModule,
    ]
})
export class ApplicationModule {}
