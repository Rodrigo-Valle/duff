import { BeerStyleRepository } from "@/application/interfaces";
import { GetPlaylistByTemperature } from "@/domain/usecases/playlist";
import { makeBeerStyleRepository, throwError } from "@/tests/application/mocks";
import { GetPlaylistByTemperatureService } from "@/application/services/playlist";

describe("GetPlaylistByTemperature tests", () => {
  let sut: GetPlaylistByTemperature;
  let repositoryStub: BeerStyleRepository;

  beforeAll(() => {
    repositoryStub = makeBeerStyleRepository();
  });

  beforeEach(() => {
    sut = new GetPlaylistByTemperatureService(repositoryStub);
  });
  test("Should Call BeerStyleRepository with correct values", async () => {
    const findSpy = jest.spyOn(repositoryStub, "findByTemperatureAverage");

    await sut.get(5);

    expect(findSpy).toHaveBeenCalledWith(5);
  });

  test("Should throw if BeerStyleRepository throws", async () => {
    jest.spyOn(repositoryStub, "findByTemperatureAverage").mockImplementationOnce(throwError);

    const promise = sut.get(5);

    await expect(promise).rejects.toThrow();
  });
});
