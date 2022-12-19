import {
  getPlaylistTracksReturn,
  getPlaylistsByBeerStyleReturn,
  SpotifyApi
} from "@/application/interfaces";
import { HttpClient } from "@/infra/interfaces";
import { env } from "@/main/config/env";
import qs from "qs";

export class SpotifyApiGateway implements SpotifyApi {
  baseUrlAuth = "https://accounts.spotify.com";
  baseUrlSpotify = "https://api.spotify.com/v1";
  token: string = "";

  constructor(private readonly httpClient: HttpClient) {}

  async getPlaylistsByBeerStyle(beerStyle: string): Promise<getPlaylistsByBeerStyleReturn | null> {
    await this.getToken();

    const query = `?q=${beerStyle}&type=playlist&limit=1`;
    const url = `${this.baseUrlSpotify}/search${query}`;
    const params = {
      headers: {
        Authorization: "Bearer " + this.token
      }
    };

    const result = await this.httpClient.get({ url, params });

    if (result.playlists.items.length === 0) return null;

    return {
      id: result.playlists.items[0].id,
      name: result.playlists.items[0].name
    };
  }

  async getPlaylistTracks(id: string): Promise<getPlaylistTracksReturn> {
    await this.getToken();

    const query = "?fields=items(track(artists(name,external_urls.spotify),name))";
    const url = `${this.baseUrlSpotify}/playlists/${id}/tracks${query}`;
    const params = {
      headers: {
        Authorization: "Bearer " + this.token
      }
    };

    const result = await this.httpClient.get({ url, params });

    return result;
  }

  private async getToken(): Promise<void> {
    const url = `${this.baseUrlAuth}/api/token`;
    const data = { grant_type: "client_credentials" };
    const params = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: env.spotify.user,
        password: env.spotify.secret
      }
    };

    const result = await this.httpClient.post({ url, data: qs.stringify(data), params });
    this.token = result.access_token;
  }
}
