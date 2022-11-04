import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUsers1667467474935 implements MigrationInterface {
    name = 'createTableUsers1667467474935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "uid" character varying NOT NULL, "email" character varying, "emailVerified" boolean NOT NULL, "displayName" character varying, "photoURL" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_user_uid" ON "users" ("uid") `);
        await queryRunner.query(`CREATE INDEX "idx_user_email" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_user_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_uid"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
