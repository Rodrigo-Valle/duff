import { SpotifyApi } from "../interfaces";

export const tokenMock = { access_token: "token" };
export const playlistsMock = {
  playlists: {
    items: [
      {
        id: "any_id",
        name: "any_name"
      }
    ]
  }
};

export const tracks = {
  items: [
    {
      tracks: {
        artists: [
          {
            external_urls: {
              spotify: "any_url"
            },
            name: "any_name"
          }
        ],
        name: "any_name"
      }
    }
  ]
};

export const makeSpotifyApiStub = (): SpotifyApi => {
  class SpotifyApiStub implements SpotifyApi {
    async getToken(): Promise<any> {
      return tokenMock;
    }

    async getPlaylistsByBeerStyle(beerStyle: string): Promise<any> {
      return playlistsMock;
    }

    async getPlaylistTracks(id: string): Promise<any> {
      return tracks;
    }
  }

  return new SpotifyApiStub();
};
