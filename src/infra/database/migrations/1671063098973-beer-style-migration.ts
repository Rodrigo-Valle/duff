import { MigrationInterface, QueryRunner } from "typeorm";

export class beerStyleMigration1671063098973 implements MigrationInterface {
  name = "beerStyleMigration1671063098973";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE \"beer-style\" (\"id\" uuid NOT NULL DEFAULT gen_random_uuid(), \"name\" character varying NOT NULL, \"minTemperature\" integer NOT NULL, \"maxTemperature\" integer NOT NULL, CONSTRAINT \"PK_e4db49fad5c30ecb3b7fa2528c0\" PRIMARY KEY (\"id\"))"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE \"beer-style\"");
  }
}
