import { MigrationInterface, QueryRunner } from "typeorm";

export class OndeleteMigration1696523961722 implements MigrationInterface {
    name = 'OndeleteMigration1696523961722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_019275b0b62c3f8b98e66c6d79c"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_019275b0b62c3f8b98e66c6d79c" FOREIGN KEY ("anouncementId") REFERENCES "anouncements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_019275b0b62c3f8b98e66c6d79c"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_019275b0b62c3f8b98e66c6d79c" FOREIGN KEY ("anouncementId") REFERENCES "anouncements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
