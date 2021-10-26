import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropColumnAuthorIdFromTasks1635252150005
  implements MigrationInterface
{
  name = 'DropColumnAuthorIdFromTasks1635252150005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_42434f901d86bd2fc5f0f6e4779"`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "author_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ADD "author_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_42434f901d86bd2fc5f0f6e4779" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
