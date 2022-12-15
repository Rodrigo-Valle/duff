import { GetAllBeerStyleService } from "@/application/services";
import { IBeerStyleRepository } from "@/domain/interfaces";
import { makeBeerStyleRepository, repoReturn, throwError } from "@/tests/application/mocks";

describe("GetAllBeerStyleService Tests", () => {
  let sut: GetAllBeerStyleService;
  let beerstyleRepositoryStub: IBeerStyleRepository;

  beforeAll(() => {
    beerstyleRepositoryStub = makeBeerStyleRepository();
  });

  beforeEach(() => {
    sut = new GetAllBeerStyleService(beerstyleRepositoryStub);
  });

  test("Should Call BeerStyleRepository", async () => {
    const getAllSpy = jest.spyOn(beerstyleRepositoryStub, "findAll");

    await sut.getAll();

    expect(getAllSpy).toHaveBeenCalled();
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(beerstyleRepositoryStub, "findAll").mockImplementationOnce(throwError);

    const promise = sut.getAll();

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.getAll();

    expect(result).toEqual([repoReturn]);
  });
});
