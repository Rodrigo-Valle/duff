import { DeleteBeerStyleService } from "@/application/services";
import { IBeerStyleRepository } from "@/domain/interfaces";
import { makeBeerStyleRepository, throwError, makeDeleteResult } from "@/tests/application/mocks";

describe("DeleteBeerStyleService Tests", () => {
  let sut: DeleteBeerStyleService;
  let beerstyleRepositoryStub: IBeerStyleRepository;
  let id: string;

  beforeAll(() => {
    beerstyleRepositoryStub = makeBeerStyleRepository();
    id = "any_id";
  });

  beforeEach(() => {
    sut = new DeleteBeerStyleService(beerstyleRepositoryStub);
  });

  test("Should Call BeerStyleRepository", async () => {
    const deleteSpy = jest.spyOn(beerstyleRepositoryStub, "remove");

    await sut.delete(id);

    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(beerstyleRepositoryStub, "remove").mockImplementationOnce(throwError);

    const promise = sut.delete(id);

    await expect(promise).rejects.toThrow();
  });

  test("Should return null if deleteResult.affected = 0", async () => {
    const deleteResult = makeDeleteResult();
    deleteResult.affected = 0;
    jest.spyOn(beerstyleRepositoryStub, "remove").mockResolvedValueOnce(deleteResult);

    const result = await sut.delete(id);

    expect(result).toBe(null);
  });

  test("Should return null if deleteResult.affected = null", async () => {
    const deleteResult = makeDeleteResult();
    deleteResult.affected = null;
    jest.spyOn(beerstyleRepositoryStub, "remove").mockResolvedValueOnce(deleteResult);

    const result = await sut.delete(id);

    expect(result).toBe(null);
  });

  test("Should return null if deleteResult.affected = undefined", async () => {
    const deleteResult = makeDeleteResult();
    jest.spyOn(beerstyleRepositoryStub, "remove").mockResolvedValueOnce(deleteResult);

    const result = await sut.delete(id);

    expect(result).toBe(null);
  });

  test("Should return an number on success", async () => {
    const result = await sut.delete(id);

    expect(result).toBe(1);
  });
});
