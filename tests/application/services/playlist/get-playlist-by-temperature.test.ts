import { BeerStyleRepository, SpotifyApi } from "@/application/interfaces";
import { GetPlaylistByTemperature } from "@/domain/usecases/playlist";
import { makeBeerStyleRepository, throwError } from "@/tests/application/mocks";
import { GetPlaylistByTemperatureService } from "@/application/services/playlist";
import { makeSpotifyApiStub, mockReponse } from "@/tests/application/mocks/spotify-api.mock";

describe("GetPlaylistByTemperature tests", () => {
  let sut: GetPlaylistByTemperature;
  let repositoryStub: BeerStyleRepository;
  let spotifyApi: SpotifyApi;

  beforeAll(() => {
    repositoryStub = makeBeerStyleRepository();
    spotifyApi = makeSpotifyApiStub();
  });

  beforeEach(() => {
    sut = new GetPlaylistByTemperatureService(repositoryStub, spotifyApi);
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

  test("Should Call SpotifyApi getPlaylistsByBeerStyle with correct values", async () => {
    const findSpy = jest.spyOn(spotifyApi, "getPlaylistsByBeerStyle");

    await sut.get(5);

    expect(findSpy).toHaveBeenCalledWith("any_name");
  });

  test("Should return null if SpotifyApi getPlaylistsByBeerStyle returns null", async () => {
    jest.spyOn(spotifyApi, "getPlaylistsByBeerStyle").mockResolvedValueOnce(null);

    const result = await sut.get(5);

    expect(result).toBe(null);
  });

  test("Should Call SpotifyApi getPlaylistTracks with correct values", async () => {
    const findSpy = jest.spyOn(spotifyApi, "getPlaylistTracks");

    await sut.get(5);

    expect(findSpy).toHaveBeenCalledWith("any_id");
  });

  test("Should return an Playlist", async () => {
    const result = await sut.get(5);

    expect(result).toEqual(mockReponse);
  });
});
