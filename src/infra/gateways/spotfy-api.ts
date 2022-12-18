import { HttpClient } from "@/infra/interfaces";
import qs from "qs";

export class SpotfyApi {
  baseUrlAuth = "https://accounts.spotify.com/api/token";

  constructor(private readonly httpClient: HttpClient) {}

  async getToken(): Promise<any> {
    const url = this.baseUrlAuth;
    const data = { grant_type: "client_credentials" };
    const params = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: "7b6d2342d24640d1b4b9217357a29338",
        password: "6379ed4dc47446e19c1b3e4e0e54a1ff"
      }
    };

    const result = await this.httpClient.post({ url, data: qs.stringify(data), params });
    return result;
  }
}
