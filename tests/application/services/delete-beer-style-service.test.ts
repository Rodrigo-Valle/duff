import { DeleteBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/application/interfaces";
import { makeBeerStyleRepository, throwError, makeDeleteResult } from "@/tests/application/mocks";

describe("DeleteBeerStyleService Tests", () => {
  let sut: DeleteBeerStyleService;
  let repositoryStub: BeerStyleRepository;
  let id: string;

  beforeAll(() => {
    repositoryStub = makeBeerStyleRepository();
    id = "any_id";
  });

  beforeEach(() => {
    sut = new DeleteBeerStyleService(repositoryStub);
  });

  test("Should Call BeerStyleRepository with id", async () => {
    const deleteSpy = jest.spyOn(repositoryStub, "remove");

    await sut.delete(id);

    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(repositoryStub, "remove").mockImplementationOnce(throwError);

    const promise = sut.delete(id);

    await expect(promise).rejects.toThrow();
  });

  test("Should return null if deleteResult.affected = 0", async () => {
    const deleteResult = makeDeleteResult();
    deleteResult.affected = 0;
    jest.spyOn(repositoryStub, "remove").mockResolvedValueOnce(deleteResult);

    const result = await sut.delete(id);

    expect(result).toBe(null);
  });

  test("Should return null if deleteResult.affected = null", async () => {
    const deleteResult = makeDeleteResult();
    deleteResult.affected = null;
    jest.spyOn(repositoryStub, "remove").mockResolvedValueOnce(deleteResult);

    const result = await sut.delete(id);

    expect(result).toBe(null);
  });

  test("Should return null if deleteResult.affected = undefined", async () => {
    const deleteResult = makeDeleteResult();
    jest.spyOn(repositoryStub, "remove").mockResolvedValueOnce(deleteResult);

    const result = await sut.delete(id);

    expect(result).toBe(null);
  });

  test("Should return an number on success", async () => {
    const result = await sut.delete(id);

    expect(result).toBe(1);
  });
});
