import { AddBeerStyleService } from "@/application/services";
import { IBeerStyleRepository } from "@/domain/interfaces";
import {
  addBeerStyleDTO,
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

    await sut.add(addBeerStyleDTO);

    expect(addSpy).toHaveBeenCalledWith(addBeerStyleDTO);
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(beerstyleRepositoryStub, "save").mockImplementationOnce(throwError);

    const promise = sut.add(addBeerStyleDTO);

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.add(addBeerStyleDTO);

    expect(result).toEqual(repoReturn);
  });
});
