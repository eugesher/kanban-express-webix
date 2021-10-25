import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasks1635155677470 implements MigrationInterface {
  name = 'CreateTasks1635155677470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."tasks_status_enum" AS ENUM('Backlog', 'In progress', 'Ready to test', 'In test', 'Done')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'Backlog', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" uuid, "assigned_employee" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_42434f901d86bd2fc5f0f6e4779" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_35f1c76fa00a97a0d9bec2c5fd4" FOREIGN KEY ("assigned_employee") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_35f1c76fa00a97a0d9bec2c5fd4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_42434f901d86bd2fc5f0f6e4779"`,
    );
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
  }
}
