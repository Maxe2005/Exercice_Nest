import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUser1749718976208 implements MigrationInterface {
  name = 'AddPasswordToUser1749718976208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
