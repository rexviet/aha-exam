import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUserActions1667718340095 implements MigrationInterface {
    name = 'createTableUserActions1667718340095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_actions" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "method" character varying NOT NULL, "path" character varying NOT NULL, "timestamp" bigint NOT NULL, CONSTRAINT "PK_3c8a683381b553ee59ce5b7b13a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_user_actions_uid" ON "user_actions" ("uid") `);
        await queryRunner.query(`CREATE INDEX "idx_user_actions_timestamp" ON "user_actions" ("timestamp") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_user_actions_timestamp"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_actions_uid"`);
        await queryRunner.query(`DROP TABLE "user_actions"`);
    }

}
