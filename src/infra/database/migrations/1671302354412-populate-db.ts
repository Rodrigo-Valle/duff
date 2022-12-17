import { MigrationInterface, QueryRunner } from "typeorm";

export class populateDb1671302354412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "beer-style"("id", "name", "minTemperature", "maxTemperature") VALUES
      (gen_random_uuid(), 'Weissbier', -1, 3),
      (gen_random_uuid(), 'Pilsens', -2, 4),
      (gen_random_uuid(), 'Weizenbier', -4, 6),
      (gen_random_uuid(), 'Red ale', -5, 5),
      (gen_random_uuid(), 'India pale ale', -6, 7),
      (gen_random_uuid(), 'IPA	', -7, 10),
      (gen_random_uuid(), 'Dunkel', -8, 2),
      (gen_random_uuid(), 'Imperial Stouts', -10, 13),
      (gen_random_uuid(), 'Brown ale', 0, 14)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM \"beer-style\"");
  }
}
