import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { BeerStyleDBEntity } from "@/infra/entities";
import { app } from "@/main/config/app";

import request from "supertest";
import { Repository } from "typeorm";

describe("AddBeerStyleRoute Test", () => {
  let repository: Repository<BeerStyleDBEntity>;

  beforeAll(async () => {
    await PostgresDataSource.initialize();
    repository = PostgresDataSource.getRepository(BeerStyleDBEntity);
  });

  afterAll(async () => {
    await PostgresDataSource.destroy();
  });

  afterEach(async () => {
    await repository.clear();
  });

  it("Should return 201", async () => {
    const response = await request(app).post("/api/beer").send({
      name: "teste",
      minTemperature: 1,
      maxTemperature: 10
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBe("teste");
    expect(response.body.minTemperature).toBe(1);
    expect(response.body.maxTemperature).toBe(10);
  });
});
