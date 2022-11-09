import { Outbox } from '@modules/outbox/domain/outbox.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateUserActionPayload } from './domain/payload/create-user-action.payload';
import { UserAction } from './domain/user-action.entity';
import { IUserActionModel } from './domain/user-action.model';

export interface IUserActionRepository {
  createUserAction(payload: CreateUserActionPayload): Promise<IUserActionModel>;
  countActiveSessionsToday(): Promise<number>;
  countAvgSessionsInDaysRange(days: number): Promise<number>;
}

export class UserActionRepositoryImpl implements IUserActionRepository {
  constructor(
    @InjectRepository(UserAction)
    private readonly repository: Repository<UserAction>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  public async createUserAction(
    payload: CreateUserActionPayload,
  ): Promise<IUserActionModel> {
    return this.repository.manager.transaction(async (entityManager) => {
      let userAction = new UserAction();
      userAction.uid = payload.uid;
      userAction.method = payload.method;
      userAction.path = payload.path;
      userAction.timestamp = payload.timestamp;
      userAction = await entityManager.save(userAction);

      await entityManager
        .createQueryBuilder()
        .insert()
        .into(Outbox)
        .values({
          aggregateId: userAction.id,
          aggregateType: 'user_actions',
          payload: JSON.parse(JSON.stringify(userAction)),
          topic: 'cdc-user-action-created',
        })
        .execute();
      return userAction;
    });
  }

  public async countActiveSessionsToday(): Promise<number> {
    const queryRunner = this.dataSource.createQueryRunner();
    const queryRs = await queryRunner.query(
      `
        SELECT COUNT( DISTINCT(uid) ) AS "count"
        FROM
          "public"."user_actions" "UserAction" 
        WHERE
          TO_TIMESTAMP( "timestamp" / 1000 ) BETWEEN CURRENT_DATE + TIME'00:00:00' 
          AND CURRENT_DATE + TIME'23:59:59'
      `,
    );
    await queryRunner.release();
    return Number(queryRs[0].count);
  }

  public async countAvgSessionsInDaysRange(days: number): Promise<number> {
    const queryRunner = this.dataSource.createQueryRunner();
    const queryRs = await queryRunner.query(
      `
        with dt_day as (
          select *, TO_CHAR(TO_TIMESTAMP("timestamp" / 1000), 'YYYY/MM/DD') as "day"
          from user_actions
          where TO_TIMESTAMP("timestamp"/1000) >= current_date at time zone 'UTC' - interval '${days} days'
        ), dt_group as (
          select "day", count(distinct(uid))
          from dt_day
          GROUP BY "day"
        )
        select avg("count") from dt_group
      `,
    );
    await queryRunner.release();
    return Number(queryRs[0].avg);
  }
}
