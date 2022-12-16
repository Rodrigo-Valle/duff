import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { BeerStyleDBEntity } from "@/infra/entities";
import { app } from "@/main/config/app";

import request from "supertest";
import { randomUUID } from "crypto";
import { Repository } from "typeorm";

describe("DeleteBeerStyleRoute Test", () => {
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

    const response = await request(app).delete(`/api/beer/${beerStyle.id}`).send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Estilo(s) removido(s) com sucesso, quantidade removida: 1"
    });
  });

  it("Should return 404 if notFound", async () => {
    const response = await request(app).delete(`/api/beer/${randomUUID()}`).send();

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Não encontrado" });
  });
});
