import { AxiosHttpClient, SpotfyApi } from "@/infra/gateways";
import { HttpClient } from "@/infra/interfaces";

describe("SpotfyApi tests", () => {
  let sut: SpotfyApi;
  let httpClient: HttpClient;

  beforeAll(() => {
    httpClient = new AxiosHttpClient();
  });

  beforeEach(() => {
    sut = new SpotfyApi(httpClient);
  });

  describe("GetToken", () => {
    test("Should return an access_token", async () => {
      const result = await sut.getToken();

      expect(result).toHaveProperty("access_token");
    });
  });
});
