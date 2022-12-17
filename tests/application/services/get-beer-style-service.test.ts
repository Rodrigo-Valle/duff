import { GetBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/application/interfaces";
import { makeBeerStyleRepository, repositoryReturn, throwError } from "@/tests/application/mocks";

describe("GetBeerStyleService Tests", () => {
  let sut: GetBeerStyleService;
  let repositoryStub: BeerStyleRepository;
  let id: string;

  beforeAll(() => {
    repositoryStub = makeBeerStyleRepository();
    id = "any_id";
  });

  beforeEach(() => {
    sut = new GetBeerStyleService(repositoryStub);
  });

  test("Should Call BeerStyleRepository with id", async () => {
    const getSpy = jest.spyOn(repositoryStub, "findOne");

    await sut.get(id);

    expect(getSpy).toHaveBeenCalledWith(id);
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(repositoryStub, "findOne").mockImplementationOnce(throwError);

    const promise = sut.get(id);

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.get(id);

    expect(result).toEqual(repositoryReturn);
  });
});
