import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriorityFieldTaskEntity1771203454499 implements MigrationInterface {
    name = 'addPriorityFieldTaskEntity1771203454499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "priority" character varying NOT NULL DEFAULT 'low'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "priority"`);
    }

}
