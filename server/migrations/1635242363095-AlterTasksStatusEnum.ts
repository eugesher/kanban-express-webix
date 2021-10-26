import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTasksStatusEnum1635242363095 implements MigrationInterface {
  name = 'AlterTasksStatusEnum1635242363095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."tasks_status_enum" RENAME TO "tasks_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tasks_status_enum" AS ENUM('new', 'work', 'test', 'done')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "status" TYPE "public"."tasks_status_enum" USING "status"::"text"::"public"."tasks_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'new'`,
    );
    await queryRunner.query(`DROP TYPE "public"."tasks_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."tasks_status_enum_old" AS ENUM('Backlog', 'In progress', 'Ready to test', 'In test', 'Done')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "status" TYPE "public"."tasks_status_enum_old" USING "status"::"text"::"public"."tasks_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'Backlog'`,
    );
    await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."tasks_status_enum_old" RENAME TO "tasks_status_enum"`,
    );
  }
}
