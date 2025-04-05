import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { AuthModule } from './common/security/auth/auth.module';
import { UserModule } from './user/user.module';
import { UserPatternModule } from './user-pattern/user-pattern.module';
import { UserTypeScoreModule } from './user-type-score/user-type-score.module';
import { MatchRoomateModule } from './match-roommate/match-roomate.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        UserPatternModule,
        UserTypeScoreModule,
        MatchRoomateModule,
        AuthModule,
    ],
})
export class ApplicationModule {}
