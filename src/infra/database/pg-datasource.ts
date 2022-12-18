import { join } from "path";
import { DataSource } from "typeorm";
import { env } from "@/main/config/env";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: parseInt(env.db.port ?? "5432"),
  username: env.db.username,
  password: env.db.password,
  database: env.environment === "test" ? env.db.testname : env.db.name,
  entities: [join(__dirname, "../entities/**/*{.ts,.js}")],
  migrations: [join(__dirname, "./migrations/**/*{.ts,.js}")],
  synchronize: true,
  uuidExtension: "pgcrypto"
});
