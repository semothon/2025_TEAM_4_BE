import { User, UserTypeScore } from '@prisma/client';
import { UserTypeScoreData } from '../../user-pattern/model/user-type-score.data';
import { UserData } from './user.data';

export interface IUserTypeScore {
    userTypeScore: UserTypeScore;
}

export class UserWithScoreData extends UserData {
    public userTypeScore: UserTypeScoreData;

    public constructor(entity: User & IUserTypeScore) {
        super(entity);
        if (entity?.userTypeScore) {
            this.userTypeScore = new UserTypeScoreData(entity.userTypeScore);
        }
    }
}
