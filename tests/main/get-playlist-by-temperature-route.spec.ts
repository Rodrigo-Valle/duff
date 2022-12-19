import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { BeerStyleDBEntity } from "@/infra/entities";
import { app } from "@/main/config/app";

import request from "supertest";
import { Repository } from "typeorm";

describe("GetPlaylistByTemperature Test", () => {
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
    await repository.save({
      name: "Pilsen",
      minTemperature: -4,
      maxTemperature: 0
    });
    const response = await request(app).get("/api/playlist?temperature=-2").send();

    expect(response.status).toBe(200);
  });

  it("Should return 404", async () => {
    await repository.save({
      name: "/w*)///d/ax//xQ/",
      minTemperature: -4,
      maxTemperature: 0
    });
    const response = await request(app).get("/api/playlist?temperature=-2").send();

    expect(response.status).toBe(404);
  });
});
