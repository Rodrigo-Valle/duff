import { GetBeerStyleService } from "@/application/services";
import { IBeerStyleRepository } from "@/domain/interfaces";
import { makeBeerStyleRepository, repoReturn, throwError } from "@/tests/application/mocks";

describe("GetBeerStyleService Tests", () => {
  let sut: GetBeerStyleService;
  let beerstyleRepositoryStub: IBeerStyleRepository;
  let id: string;

  beforeAll(() => {
    beerstyleRepositoryStub = makeBeerStyleRepository();
    id = "any_id";
  });

  beforeEach(() => {
    sut = new GetBeerStyleService(beerstyleRepositoryStub);
  });

  test("Should Call BeerStyleRepository", async () => {
    const getSpy = jest.spyOn(beerstyleRepositoryStub, "get");

    await sut.get(id);

    expect(getSpy).toHaveBeenCalledWith(id);
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(beerstyleRepositoryStub, "get").mockImplementationOnce(throwError);

    const promise = sut.get(id);

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.get(id);

    expect(result).toEqual(repoReturn);
  });
});
