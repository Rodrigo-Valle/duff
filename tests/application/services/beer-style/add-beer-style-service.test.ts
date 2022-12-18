import { AddBeerStyleService } from "@/application/services/beer-style";
import { BeerStyleRepository } from "@/application/interfaces";
import {
  saveBeerStyleDTO,
  makeBeerStyleRepository,
  repositoryReturn,
  throwError
} from "@/tests/application/mocks";

describe("AddBeerStyleService Tests", () => {
  let sut: AddBeerStyleService;
  let repositoryStub: BeerStyleRepository;

  beforeAll(() => {
    repositoryStub = makeBeerStyleRepository();
  });

  beforeEach(() => {
    sut = new AddBeerStyleService(repositoryStub);
  });

  test("Should Call BeerStyleRepository with correct values", async () => {
    const addSpy = jest.spyOn(repositoryStub, "save");

    await sut.add(saveBeerStyleDTO);

    expect(addSpy).toHaveBeenCalledWith(saveBeerStyleDTO);
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(repositoryStub, "save").mockImplementationOnce(throwError);

    const promise = sut.add(saveBeerStyleDTO);

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.add(saveBeerStyleDTO);

    expect(result).toEqual(repositoryReturn);
  });
});
