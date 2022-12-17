import { UpdateBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/application/interfaces";
import {
  makeBeerStyleRepository,
  repositoryReturn,
  saveBeerStyleDTO,
  throwError
} from "@/tests/application/mocks";

describe("UpdateBeerStyleService Tests", () => {
  let sut: UpdateBeerStyleService;
  let repositoryStub: BeerStyleRepository;
  let id: string;

  beforeAll(() => {
    repositoryStub = makeBeerStyleRepository();
    id = "any_id";
  });

  beforeEach(() => {
    sut = new UpdateBeerStyleService(repositoryStub);
  });

  test("Should Call BeerStyleRepository findOne with id", async () => {
    const updateSpy = jest.spyOn(repositoryStub, "findOne");

    await sut.update(saveBeerStyleDTO, id);

    expect(updateSpy).toHaveBeenCalledWith(id);
  });

  test("Should throw if BeerStyleRepository findOne throws", async () => {
    jest.spyOn(repositoryStub, "findOne").mockImplementationOnce(throwError);

    const promise = sut.update(saveBeerStyleDTO, id);

    await expect(promise).rejects.toThrow();
  });

  test("Should return null if findOne notFound", async () => {
    jest.spyOn(repositoryStub, "findOne").mockResolvedValueOnce(null);

    const result = await sut.update(saveBeerStyleDTO, id);

    expect(result).toEqual(null);
  });

  test("Should Call BeerStyleRepository save with correct values", async () => {
    const updateSpy = jest.spyOn(repositoryStub, "save");
    const result = Object.assign({}, saveBeerStyleDTO, { id: "any_id" });

    await sut.update(saveBeerStyleDTO, id);

    expect(updateSpy).toHaveBeenCalledWith(result);
  });

  test("Should throw if BeerStyleRepository save throws", async () => {
    jest.spyOn(repositoryStub, "save").mockImplementationOnce(throwError);

    const promise = sut.update(saveBeerStyleDTO, id);

    await expect(promise).rejects.toThrow();
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.update(saveBeerStyleDTO, id);

    expect(result).toEqual(repositoryReturn);
  });

  test("Should return an beerstyle on success without values", async () => {
    const result = await sut.update({}, id);

    expect(result).toEqual(repositoryReturn);
  });
});
