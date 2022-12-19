import { Playlist } from "@/domain/models";
import { GetPlaylistByTemperature } from "@/domain/usecases/playlist";

export const requestMock = {
  query: {
    temperature: 5
  }
};

export const serviceResponse = {
  beerStyle: "any_style",
  playlist: {
    name: "any_playlist",
    tracks: [
      {
        name: "any_track",
        artist: "any_artist",
        link: "any_link"
      }
    ]
  }
};

export const makeGetPlaylistByTemperatureService = (): GetPlaylistByTemperature => {
  class GetPlaylistByTemperatureStyleServiceStub implements GetPlaylistByTemperature {
    async get(temperature: number): Promise<Playlist | null> {
      return serviceResponse;
    }
  }
  return new GetPlaylistByTemperatureStyleServiceStub();
};
