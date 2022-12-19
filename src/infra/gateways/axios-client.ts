import { HttpClient, HttpGet, HttpPost } from "@/infra/interfaces";

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

  async get({ url, params }: HttpGet): Promise<any> {
    try {
      const result = await axios.get(url, params);

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}
