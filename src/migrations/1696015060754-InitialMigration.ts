import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696015060754 implements MigrationInterface {
    name = 'InitialMigration1696015060754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_tipo_de_conta_enum" AS ENUM('Comprador', 'Anunciante')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "cpf" integer NOT NULL, "celular" character varying(30) NOT NULL, "data_de_nascimento" character varying(30) NOT NULL, "descricao" text NOT NULL, "tipo_de_conta" "public"."users_tipo_de_conta_enum" NOT NULL DEFAULT 'Comprador', "password" character varying(200) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_tipo_de_conta_enum"`);
    }

}
