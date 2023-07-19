import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1689516335169 implements MigrationInterface {
  name = 'Init1689516335169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "birthday" TIMESTAMP NOT NULL, "lockedUntil" TIMESTAMP WITH TIME ZONE NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "password" text NOT NULL, "salt" text NOT NULL, "passwordUpdated" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
