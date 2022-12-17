import { GetAllBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/application/interfaces";
import { makeBeerStyleRepository, repositoryReturn, throwError } from "@/tests/application/mocks";

describe("GetAllBeerStyleService Tests", () => {
  let sut: GetAllBeerStyleService;
  let repositoryStub: BeerStyleRepository;

  beforeAll(() => {
    repositoryStub = makeBeerStyleRepository();
  });

  beforeEach(() => {
    sut = new GetAllBeerStyleService(repositoryStub);
  });

  test("Should Call BeerStyleRepository", async () => {
    const getAllSpy = jest.spyOn(repositoryStub, "findAll");

    await sut.getAll();

    expect(getAllSpy).toHaveBeenCalled();
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(repositoryStub, "findAll").mockImplementationOnce(throwError);

    const promise = sut.getAll();

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.getAll();

    expect(result).toEqual([repositoryReturn]);
  });
});
