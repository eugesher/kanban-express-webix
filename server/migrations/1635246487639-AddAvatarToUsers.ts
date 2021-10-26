import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatarToUsers1635246487639 implements MigrationInterface {
  name = 'AddAvatarToUsers1635246487639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
