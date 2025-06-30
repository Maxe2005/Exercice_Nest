import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirstName1750420896888 implements MigrationInterface {
  name = 'AddFirstName1750420896888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstname" character varying NOT NULL DEFAULT 'Le PNJ'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstname"`);
  }
}
