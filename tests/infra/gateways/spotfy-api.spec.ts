import { AxiosHttpClient, SpotifyApiGateway } from "@/infra/gateways";
import { HttpClient } from "@/infra/interfaces";

describe("SpotfyApi tests", () => {
  let sut: SpotifyApiGateway;
  let httpClient: HttpClient;

  beforeAll(() => {
    httpClient = new AxiosHttpClient();
  });

  beforeEach(() => {
    sut = new SpotifyApiGateway(httpClient);
  });

  describe("GetPlaylists", () => {
    test("Should return an playlist", async () => {
      const result = await sut.getPlaylistsByBeerStyle("IPA");

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name");
    });
  });

  describe("GetPlaylistTracks", () => {
    test("Should return all tracks from a playlist", async () => {
      const playlist = await sut.getPlaylistsByBeerStyle("IPA");
      if (!playlist) return undefined;
      const result = await sut.getPlaylistTracks(playlist.id);

      expect(result).toHaveProperty("items");
    });
  });
});
