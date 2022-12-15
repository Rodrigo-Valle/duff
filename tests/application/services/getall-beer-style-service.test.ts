import { GetAllBeerStyleService } from "@/application/services";
import { IBeerStyleRepository } from "@/domain/interfaces";
import { makeBeerStyleRepository, repoReturn, throwError } from "@/tests/application/mocks";

describe("AddBeerStyleService Tests", () => {
  let sut: GetAllBeerStyleService;
  let beerstyleRepositoryStub: IBeerStyleRepository;

  beforeAll(() => {
    beerstyleRepositoryStub = makeBeerStyleRepository();
  });

  beforeEach(() => {
    sut = new GetAllBeerStyleService(beerstyleRepositoryStub);
  });

  test("Should Call BeerStyleRepository", async () => {
    const addSpy = jest.spyOn(beerstyleRepositoryStub, "getAll");

    await sut.getAll();

    expect(addSpy).toHaveBeenCalled();
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(beerstyleRepositoryStub, "getAll").mockImplementationOnce(throwError);

    const promise = sut.getAll();

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.getAll();

    expect(result).toEqual([repoReturn]);
  });
});
