import "dotenv/config";
import { join } from "path";
import { DataSource } from "typeorm";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [join(__dirname, "../entities/**/*{.ts,.js}")],
  migrations: [join(__dirname, "./migrations/**/*{.ts,.js}")],
  synchronize: false,
  uuidExtension: "pgcrypto"
});
