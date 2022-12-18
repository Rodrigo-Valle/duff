import { HttpClient, HttpPost } from "@/infra/interfaces";

import axios from "axios";

export class AxiosHttpClient implements HttpClient {
  async post({ url, data, params }: HttpPost): Promise<any> {
    try {
      const result = await axios.post(url, data, params);

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}
