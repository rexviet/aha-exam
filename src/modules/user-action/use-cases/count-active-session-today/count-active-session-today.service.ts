import { IUserActionRepository } from '@modules/user-action/user-action.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountActiveSessionsTodayService {
    constructor(private readonly repository: IUserActionRepository) {}

    public async execute(): Promise<number> {
        return this.repository.countActiveSessionsToday();
    }
}
