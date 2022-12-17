/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DataType, newDb, IMemoryDb } from "pg-mem";
import { DataSource } from "typeorm";
import { v4 } from "uuid";

interface mockedDbConnection {
  db: IMemoryDb;
  dataSource: DataSource;
}

export const makeBeerStyleDTO = (): any => ({
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
});

export const makemockedDbConnection = (entities: any[]): mockedDbConnection => {
  const db = newDb({ autoCreateForeignKeyIndices: true });

  db.public.registerFunction({
    name: "current_database",
    args: [],
    returns: DataType.text,
    implementation: (x: any) => `hello world: ${x}`
  });

  db.public.registerFunction({
    name: "version",
    args: [],
    returns: DataType.text,
    implementation: (x: any) => `hello world: ${x}`
  });

  db.registerExtension("uuid-ossp", (schema: any) => {
    schema.registerFunction({
      name: "uuid_generate_v4",
      returns: DataType.uuid,
      implementation: v4,
      impure: true
    });
  });

  const dataSource: DataSource = db.adapters.createTypeormDataSource({
    type: "postgres",
    entities
  });

  return {
    db,
    dataSource
  };
};