import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { BeerStyleDBEntity } from "@/infra/entities";
import { app } from "@/main/config/app";
import { randomUUID } from "crypto";
import request from "supertest";
import { Repository } from "typeorm";

describe("GetBeerStyleRoute Test", () => {
  let repository: Repository<BeerStyleDBEntity>;

  beforeAll(async () => {
    await PostgresDataSource.initialize();
    console.log(PostgresDataSource.isInitialized);
    repository = PostgresDataSource.getRepository(BeerStyleDBEntity);
  });

  afterAll(async () => {
    await PostgresDataSource.destroy();
  });

  describe("DB tests", () => {
    afterEach(async () => {
      await repository.clear();
    });

    it("Should return 200", async () => {
      const beerStyle = await repository.save({
        name: "teste",
        minTemperature: 1,
        maxTemperature: 10
      });

      const response = await request(app).get(`/api/beer/${beerStyle.id}`).send();

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(beerStyle.id);
      expect(response.body.name).toBe("teste");
      expect(response.body.minTemperature).toBe(1);
      expect(response.body.maxTemperature).toBe(10);
    });

    it("Should return 404 if notFound", async () => {
      const response = await request(app).get(`/api/beer/${randomUUID()}`).send();

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Não encontrado" });
    });
  });
});
