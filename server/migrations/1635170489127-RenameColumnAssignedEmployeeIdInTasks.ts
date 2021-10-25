import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnAssignedEmployeeIdInTasks1635170489127
  implements MigrationInterface
{
  name = 'RenameColumnAssignedEmployeeIdInTasks1635170489127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_35f1c76fa00a97a0d9bec2c5fd4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" RENAME COLUMN "assigned_employee" TO "assigned_employee_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_23f8b2efcb24e9f05a66af9f010" FOREIGN KEY ("assigned_employee_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_23f8b2efcb24e9f05a66af9f010"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" RENAME COLUMN "assigned_employee_id" TO "assigned_employee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_35f1c76fa00a97a0d9bec2c5fd4" FOREIGN KEY ("assigned_employee") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
