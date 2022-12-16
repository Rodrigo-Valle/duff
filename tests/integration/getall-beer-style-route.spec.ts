import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { BeerStyleDBEntity } from "@/infra/entities";
import { app } from "@/main/config/app";
import request from "supertest";
import { Repository } from "typeorm";

describe("GetBeerStyleRoute Test", () => {
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
    await repository.save([
      {
        name: "teste",
        minTemperature: 1,
        maxTemperature: 10
      },
      {
        name: "teste2",
        minTemperature: -5,
        maxTemperature: 3
      }
    ]);

    const response = await request(app).get("/api/beer").send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("Should return 200 if and an empty array if notFound", async () => {
    const response = await request(app).get("/api/beer").send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
