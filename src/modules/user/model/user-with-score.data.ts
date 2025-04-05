import { User } from '@prisma/client';
import { UserTypeScoreData } from '../../user-pattern/model/user-type-score.data';
import { UserData } from './user.data';

export class UserWithScore extends UserData {
    public userTypeScore: UserTypeScoreData;

    public constructor(entity: User) {
        super(entity);
        this.userTypeScore = new UserTypeScoreData(entity.userTypeScore!);
    }
}
