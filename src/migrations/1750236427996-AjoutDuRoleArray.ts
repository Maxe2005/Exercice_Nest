import { MigrationInterface, QueryRunner } from 'typeorm';

export class AjoutDuRoleArray1750236427996 implements MigrationInterface {
  name = 'AjoutDuRoleArray1750236427996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" text array NOT NULL DEFAULT '{USER}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'USER'`,
    );
  }
}
