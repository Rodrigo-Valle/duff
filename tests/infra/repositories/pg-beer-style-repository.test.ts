/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BeerStyleDBEntity } from "@/infra/entities";
import { PostgresBeerStyleRepository } from "@/infra/repositories";
import { makeBeerStyleDTO, makemockedDbConnection } from "@/tests/infra/mocks";

import { IBackup, IMemoryDb } from "pg-mem";
import { DataSource, Repository } from "typeorm";

describe("PostgresBeerStyleRepository tests", () => {
  let sut: PostgresBeerStyleRepository;
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
    sut = new PostgresBeerStyleRepository(dataSource);
  });

  describe("AddBeerStyle Method", () => {
    test("should create and return a beerstyle", async () => {
      const beerstyle = await sut.save(makeBeerStyleDTO());

      expect(beerstyle.id).toBeTruthy();
      expect(beerstyle.name).toBe("any_name");
      expect(beerstyle.minTemperature).toBe(1);
      expect(beerstyle.maxTemperature).toBe(10);
    });
  });

  describe("GetAllBeerStyle Method", () => {
    test("should return an array of beerstyle", async () => {
      await repository.insert([makeBeerStyleDTO(), makeBeerStyleDTO()]);

      const beerstyle = await sut.findAll();

      expect(Array.isArray(beerstyle)).toBe(true);
      expect(beerstyle.length).toBe(2);
    });

    test("should return an empty array of beerstyle", async () => {
      const beerstyle = await sut.findAll();

      expect(Array.isArray(beerstyle)).toBe(true);
      expect(beerstyle.length).toBe(0);
    });
  });

  describe("GetBeerStyle Method", () => {
    test("should return an beerstyle", async () => {
      const mockedInsert = await repository.save(makeBeerStyleDTO());

      const beerstyle = await sut.findOne(mockedInsert.id);

      expect(beerstyle).toEqual(mockedInsert);
    });

    test("should return null if beerStyle not exists", async () => {
      const beerstyle = await sut.findOne("0cef8e10-7c27-11ed-a1eb-0242ac120002");

      expect(beerstyle).toBe(null);
    });
  });

  describe("GetBeerStyle Method", () => {
    test("should remove an beerstyle", async () => {
      const mockedInsert = await repository.save(makeBeerStyleDTO());

      const beerstyle = await sut.remove(mockedInsert.id);

      expect(beerstyle.affected).toEqual(1);
    });
  });
});
