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

      expect(result).toHaveProperty("playlists");
    });
  });

  describe("GetPlaylistTracks", () => {
    test("Should return all tracks from a playlist", async () => {
      const playlist = await sut.getPlaylistsByBeerStyle("IPA");
      const result = await sut.getPlaylistTracks(playlist.playlists.items[0].id);

      expect(result).toHaveProperty("items");
    });
  });
});
