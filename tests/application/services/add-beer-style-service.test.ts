import { AddBeerStyleService } from "@/application/services";
import { IBeerStyleRepository } from "@/domain/interfaces";
import {
  saveBeerStyleDTO,
  makeBeerStyleRepository,
  repoReturn,
  throwError
} from "@/tests/application/mocks";

describe("AddBeerStyleService Tests", () => {
  let sut: AddBeerStyleService;
  let beerstyleRepositoryStub: IBeerStyleRepository;

  beforeAll(() => {
    beerstyleRepositoryStub = makeBeerStyleRepository();
  });

  beforeEach(() => {
    sut = new AddBeerStyleService(beerstyleRepositoryStub);
  });

  test("Should Call BeerStyleRepository with correct values", async () => {
    const addSpy = jest.spyOn(beerstyleRepositoryStub, "save");

    await sut.add(saveBeerStyleDTO);

    expect(addSpy).toHaveBeenCalledWith(saveBeerStyleDTO);
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(beerstyleRepositoryStub, "save").mockImplementationOnce(throwError);

    const promise = sut.add(saveBeerStyleDTO);

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.add(saveBeerStyleDTO);

    expect(result).toEqual(repoReturn);
  });
});
