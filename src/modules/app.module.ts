import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { UserModule } from './user/user.module';
import { UserPatternModule } from './user-pattern/user-pattern.module';
import { UserTypeScoreModule } from './user-type-score/user-type-score.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        UserPatternModule,
        UserTypeScoreModule,
    ],
})
export class ApplicationModule {}
