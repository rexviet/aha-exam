import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableOutbox1667490853301 implements MigrationInterface {
    name = 'createTableOutbox1667490853301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "outboxes" ("id" SERIAL NOT NULL, "aggregateId" integer NOT NULL, "aggregateType" character varying NOT NULL, "payload" jsonb NOT NULL, "topic" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'new', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7d1a1d10ad4f6b3cf63f95847a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_outbox_topic" ON "outboxes" ("topic") `);
        await queryRunner.query(`CREATE INDEX "idx_outbox_status" ON "outboxes" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_outbox_status"`);
        await queryRunner.query(`DROP INDEX "public"."idx_outbox_topic"`);
        await queryRunner.query(`DROP TABLE "outboxes"`);
    }

}
