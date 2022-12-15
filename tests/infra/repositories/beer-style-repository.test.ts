/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BeerStyleDBEntity } from "@/infra/entities";
import { BeerStyleRepository } from "@/infra/repositories";
import {
  addBeerStyleDTOArray,
  makeBeerStyleDTO,
  makemockedDbConnection
} from "@/tests/infra/mocks/beer-style-repository-mocks";

import { IBackup, IMemoryDb } from "pg-mem";
import { DataSource, Repository } from "typeorm";

describe("BeerStyleRepository tests", () => {
  let sut: BeerStyleRepository;
  let backup: IBackup;
  let db: IMemoryDb;
  let dataSource: DataSource;
  let repository: Repository<BeerStyleDBEntity>;

  beforeAll(async () => {
    const mockedDbConnection = makemockedDbConnection([BeerStyleDBEntity]);

    db = mockedDbConnection.db;
    dataSource = mockedDbConnection.dataSource;

    await dataSource.initialize();
    await dataSource.synchronize();
    backup = db.backup();
    repository = dataSource.getRepository(BeerStyleDBEntity);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  beforeEach(() => {
    backup.restore();
    sut = new BeerStyleRepository(dataSource);
  });

  describe("AddBeerStyle Method", () => {
    test("should create and return a beerstyle", async () => {
      const beerstyle = await sut.add(makeBeerStyleDTO());

      expect(beerstyle.id).toBeTruthy();
    });
  });

  describe("GetAllBeerStyle Method", () => {
    test("should return an array of beerstyle", async () => {
      await repository.insert(addBeerStyleDTOArray);

      const beerstyle = await sut.getAll();

      expect(Array.isArray(beerstyle)).toBe(true);
      expect(beerstyle.length).toBe(2);
    });

    test("should return an empty array of beerstyle", async () => {
      const beerstyle = await sut.getAll();

      expect(Array.isArray(beerstyle)).toBe(true);
      expect(beerstyle.length).toBe(0);
    });
  });

  describe("GetBeerStyle Method", () => {
    test("should return an beerstyle", async () => {
      const mockedInsert = await repository.save(makeBeerStyleDTO());

      const beerstyle = await sut.get(mockedInsert.id);

      expect(beerstyle).toEqual(mockedInsert);
    });

    test("should return null if beerStyle not exists", async () => {
      const beerstyle = await sut.get("0cef8e10-7c27-11ed-a1eb-0242ac120002");

      expect(beerstyle).toBe(null);
    });
  });
});
