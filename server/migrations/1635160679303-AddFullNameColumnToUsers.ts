import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFullNameColumnToUsers1635160679303
  implements MigrationInterface
{
  name = 'AddFullNameColumnToUsers1635160679303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "full_name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "full_name"`);
  }
}
