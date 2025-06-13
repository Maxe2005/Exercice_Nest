import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStudentAndBankDetails1749730402873 implements MigrationInterface {
    name = 'AddStudentAndBankDetails1749730402873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_detail" ("id" SERIAL NOT NULL, "studentIdNumber" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_8c41bcfbfccdc60b6f319265f6" UNIQUE ("userId"), CONSTRAINT "PK_a0203aa2118d1bac98fc7c0c01a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_detail" ("id" SERIAL NOT NULL, "bankName" character varying NOT NULL, "accountNumber" character varying NOT NULL, CONSTRAINT "PK_bfdac1bd6b02588c81b816a4a2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_bank_details_bank_detail" ("userId" integer NOT NULL, "bankDetailId" integer NOT NULL, CONSTRAINT "PK_01644ff2c568b5d90bbfcda199a" PRIMARY KEY ("userId", "bankDetailId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1db584052cebae2ae7a74096d" ON "user_bank_details_bank_detail" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4c35915b515fe133661a129faa" ON "user_bank_details_bank_detail" ("bankDetailId") `);
        await queryRunner.query(`ALTER TABLE "student_detail" ADD CONSTRAINT "FK_8c41bcfbfccdc60b6f319265f67" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_bank_details_bank_detail" ADD CONSTRAINT "FK_e1db584052cebae2ae7a74096d9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_bank_details_bank_detail" ADD CONSTRAINT "FK_4c35915b515fe133661a129faa7" FOREIGN KEY ("bankDetailId") REFERENCES "bank_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bank_details_bank_detail" DROP CONSTRAINT "FK_4c35915b515fe133661a129faa7"`);
        await queryRunner.query(`ALTER TABLE "user_bank_details_bank_detail" DROP CONSTRAINT "FK_e1db584052cebae2ae7a74096d9"`);
        await queryRunner.query(`ALTER TABLE "student_detail" DROP CONSTRAINT "FK_8c41bcfbfccdc60b6f319265f67"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c35915b515fe133661a129faa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1db584052cebae2ae7a74096d"`);
        await queryRunner.query(`DROP TABLE "user_bank_details_bank_detail"`);
        await queryRunner.query(`DROP TABLE "bank_detail"`);
        await queryRunner.query(`DROP TABLE "student_detail"`);
    }

}
