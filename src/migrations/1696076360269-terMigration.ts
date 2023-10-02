import { MigrationInterface, QueryRunner } from "typeorm";

export class TerMigration1696076360269 implements MigrationInterface {
    name = 'TerMigration1696076360269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "complemento" character varying(30)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "complemento"`);
    }

}
