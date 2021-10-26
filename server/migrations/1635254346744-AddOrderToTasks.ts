import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderToTasks1635254346744 implements MigrationInterface {
  name = 'AddOrderToTasks1635254346744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "order" smallint NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "order"`);
  }
}
