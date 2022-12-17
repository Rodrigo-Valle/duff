import "dotenv/config";
import { join } from "path";
import { DataSource } from "typeorm";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE : process.env.DATABASE,
  entities: [join(__dirname, "../entities/**/*{.ts,.js}")],
  migrations: [join(__dirname, "./migrations/**/*{.ts,.js}")],
  synchronize: true,
  uuidExtension: "pgcrypto"
});
