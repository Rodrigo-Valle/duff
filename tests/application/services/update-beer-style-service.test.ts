import { UpdateBeerStyleService } from "@/application/services";
import { IBeerStyleRepository } from "@/domain/interfaces";
import {
  makeBeerStyleRepository,
  repoReturn,
  saveBeerStyleDTO,
  throwError
} from "@/tests/application/mocks";

describe("UpdateBeerStyleService Tests", () => {
  let sut: UpdateBeerStyleService;
  let beerstyleRepositoryStub: IBeerStyleRepository;
  let id: string;

  beforeAll(() => {
    beerstyleRepositoryStub = makeBeerStyleRepository();
    id = "any_id";
  });

  beforeEach(() => {
    sut = new UpdateBeerStyleService(beerstyleRepositoryStub);
  });

  test("Should Call BeerStyleRepository findOne", async () => {
    const updateSpy = jest.spyOn(beerstyleRepositoryStub, "findOne");

    await sut.update(saveBeerStyleDTO, id);

    expect(updateSpy).toHaveBeenCalledWith(id);
  });

  test("Should throw if BeerStyleRepository find throws", async () => {
    jest.spyOn(beerstyleRepositoryStub, "findOne").mockImplementationOnce(throwError);

    const promise = sut.update(saveBeerStyleDTO, id);

    await expect(promise).rejects.toThrow();
  });

  test("Should Call BeerStyleRepository save", async () => {
    const updateSpy = jest.spyOn(beerstyleRepositoryStub, "save");
    const result = Object.assign({}, saveBeerStyleDTO, { id: "any_id" });

    await sut.update(saveBeerStyleDTO, id);

    expect(updateSpy).toHaveBeenCalledWith(result);
  });

  test("Should throw if BeerStyleRepository save throws", async () => {
    jest.spyOn(beerstyleRepositoryStub, "save").mockImplementationOnce(throwError);

    const promise = sut.update(saveBeerStyleDTO, id);

    await expect(promise).rejects.toThrow();
  });

  test("Should return null if findOne notFound", async () => {
    jest.spyOn(beerstyleRepositoryStub, "findOne").mockResolvedValueOnce(null);

    const result = await sut.update(saveBeerStyleDTO, id);

    expect(result).toEqual(null);
  });

  test("Should return an beerstyle on success", async () => {
    const result = await sut.update(saveBeerStyleDTO, id);

    expect(result).toEqual(repoReturn);
  });

  test("Should return an beerstyle on success without values", async () => {
    const result = await sut.update({}, id);

    expect(result).toEqual(repoReturn);
  });
});
