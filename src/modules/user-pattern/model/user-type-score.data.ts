import { ApiProperty } from '@nestjs/swagger';
import { UserTypeScore } from '@prisma/client';

export class UserTypeScoreData {
    @ApiProperty({ minimum: 0, maximum: 1, description: '청결' })
    public cleanliness: number;

    @ApiProperty({ minimum: 0, maximum: 1, description: '소음' })
    public noise: number;

    @ApiProperty({ minimum: 0, maximum: 1, description: '공동 물품' })
    public sharedItems: number;

    @ApiProperty({ minimum: 0, maximum: 1, description: '소통' })
    public communication: number;

    @ApiProperty({ minimum: 0, maximum: 1, description: '수면 패턴' })
    public sleepPattern: number;

    @ApiProperty({ minimum: 0, maximum: 1, description: '민감도' })
    public sensitivity: number;

    @ApiProperty({ minimum: 0, maximum: 1, description: '인내심' })
    public patience: number;

    @ApiProperty({ minimum: 0, maximum: 1, description: '집중력' })
    public attention: number;

    public constructor(entity: UserTypeScore) {
        this.cleanliness = entity.cleanliness;
        this.noise = entity.noise;
        this.sharedItems = entity.sharedItems;
        this.communication = entity.communication;
        this.sleepPattern = entity.sleepPattern;
        this.patience = entity.patience;
        this.attention = entity.attention;
    }
}
