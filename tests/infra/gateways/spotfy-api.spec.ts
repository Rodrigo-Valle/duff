import { AxiosHttpClient, SpotifyApi } from "@/infra/gateways";
import { HttpClient } from "@/infra/interfaces";

describe("SpotfyApi tests", () => {
  let sut: SpotifyApi;
  let httpClient: HttpClient;

  beforeAll(() => {
    httpClient = new AxiosHttpClient();
  });

  beforeEach(() => {
    sut = new SpotifyApi(httpClient);
  });

  describe("GetToken", () => {
    test("Should return an access_token", async () => {
      const result = await sut.getToken();

      expect(result).toHaveProperty("access_token");
    });
  });

  describe("GetPlaylists", () => {
    test("Should return an playlist", async () => {
      await sut.getToken();
      const result = await sut.getPlaylistsByBeerStyle("IPA");

      expect(result).toHaveProperty("playlists");
    });
  });

  describe("GetPlaylistTracks", () => {
    test("Should return all tracks from a playlist", async () => {
      await sut.getToken();
      const playlist = await sut.getPlaylistsByBeerStyle("IPA");
      const result = await sut.getPlaylistTracks(playlist.playlists.items[0].id);

      expect(result).toHaveProperty("items");
    });
  });
});
