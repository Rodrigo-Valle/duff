import { SpotifyApi } from "../interfaces";

export const tokenMock = { access_token: "token" };
export const playlistsMock = {
  id: "any_id",
  name: "any_playlist_name"
};

export const tracks = {
  items: [
    {
      track: {
        artists: [
          {
            external_urls: {
              spotify: "any_url"
            },
            name: "any_artist_name"
          }
        ],
        name: "any_track_name"
      }
    }
  ]
};

export const mockReponse = {
  beerStyle: "any_name",
  playlist: {
    name: "any_playlist_name",
    tracks: [
      {
        name: "any_track_name",
        artist: "any_artist_name",
        link: "any_url"
      }
    ]
  }
};

export const makeSpotifyApiStub = (): SpotifyApi => {
  class SpotifyApiStub implements SpotifyApi {
    async getToken(): Promise<any> {
      return tokenMock;
    }

    async getPlaylistsByBeerStyle(_beerStyle: string): Promise<any> {
      return playlistsMock;
    }

    async getPlaylistTracks(id: string): Promise<any> {
      return tracks;
    }
  }

  return new SpotifyApiStub();
};
