import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { BeerStyleDBEntity } from "@/infra/entities";
import { app } from "@/main/config/app";

import request from "supertest";
import { randomUUID } from "crypto";
import { Repository } from "typeorm";

describe("UpdateBeerStyleRoute Test", () => {
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

  it("Should return 200", async () => {
    const beerStyle = await repository.save({
      name: "teste",
      minTemperature: 1,
      maxTemperature: 10
    });

    const response = await request(app).patch(`/api/beer/${beerStyle.id}`).send({
      name: "update_teste",
      minTemperature: -5,
      maxTemperature: 5
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(beerStyle.id);
    expect(response.body.name).toBe("update_teste");
    expect(response.body.minTemperature).toBe(-5);
    expect(response.body.maxTemperature).toBe(5);
  });

  it("Should return 404 if notFound", async () => {
    const response = await request(app).patch(`/api/beer/${randomUUID()}`).send();

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Não encontrado" });
  });
});
