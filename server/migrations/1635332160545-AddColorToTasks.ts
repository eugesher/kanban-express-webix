import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColorToTasks1635332160545 implements MigrationInterface {
  name = 'AddColorToTasks1635332160545';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "color" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "color"`);
  }
}
