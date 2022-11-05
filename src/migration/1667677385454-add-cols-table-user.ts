import { MigrationInterface, QueryRunner } from "typeorm";

export class addColsTableUser1667677385454 implements MigrationInterface {
    name = 'addColsTableUser1667677385454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "no_times_logged_in" smallint DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_session_timestamp" int8`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_session_timestamp"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "no_times_logged_in"`);
    }

}
