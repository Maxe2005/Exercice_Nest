import { MigrationInterface, QueryRunner } from 'typeorm';

export class AjoutDuRole1750233587409 implements MigrationInterface {
  name = 'AjoutDuRole1750233587409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'USER'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
