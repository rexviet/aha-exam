import { MigrationInterface, QueryRunner } from "typeorm";

export class addColProviderTableUsers1667749711039 implements MigrationInterface {
    name = 'addColProviderTableUsers1667749711039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "provider" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider"`);
    }

}
