import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { PassengerModule } from './passenger/passenger.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        CommonModule,
        PassengerModule,
        UserModule
    ]
})
export class ApplicationModule {}
