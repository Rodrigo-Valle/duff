import { DataSource } from "typeorm";
import { BeerStyleDBEntity } from "@/infra/entities";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5000"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [BeerStyleDBEntity],
  synchronize: true,
  uuidExtension: "pgcrypto"
});
