/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BeerStyleDBEntity } from "@/infra/entities";
import { BeerStyleRepository } from "@/infra/repositories";
import {
  addBeerStyleDTO,
  makemockedDbConnection
} from "@/tests/infra/mocks/beer-style-repository-mocks";

import { IBackup, IMemoryDb } from "pg-mem";
import { DataSource } from "typeorm";

describe("BeerStyleRepository tests", () => {
  let sut: BeerStyleRepository;
  let backup: IBackup;
  let db: IMemoryDb;
  let dataSource: DataSource;

  beforeAll(async () => {
    const mockedDbConnection = makemockedDbConnection([BeerStyleDBEntity]);

    db = mockedDbConnection.db;
    dataSource = mockedDbConnection.dataSource;

    await dataSource.initialize();
    await dataSource.synchronize();
    backup = db.backup();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  beforeEach(() => {
    backup.restore();
    sut = new BeerStyleRepository(dataSource);
  });

  describe("Add method", () => {
    test("should create and return a beerstyle", async () => {
      const beerstyle = await sut.add(addBeerStyleDTO);

      expect(beerstyle.id).toBeTruthy();
    });
  });
});
