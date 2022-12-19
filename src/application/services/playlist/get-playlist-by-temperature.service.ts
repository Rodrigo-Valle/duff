import { BeerStyleRepository, SpotifyApi } from "@/application/interfaces";
import { Playlist, Tracks } from "@/domain/models";
import { GetPlaylistByTemperature } from "@/domain/usecases/playlist";

export class GetPlaylistByTemperatureService implements GetPlaylistByTemperature {
  constructor(
    private readonly repository: BeerStyleRepository,
    private readonly spotifyApi: SpotifyApi
  ) {}

  async get(temperature: number): Promise<Playlist | null> {
    const beerStyle = await this.repository.findByTemperatureAverage(temperature);

    const playlist = await this.spotifyApi.getPlaylistsByBeerStyle(beerStyle.name);

    if (!playlist) return null;

    const tracks = await this.spotifyApi.getPlaylistTracks(playlist.id);

    const playlistMapped: Playlist = {
      beerStyle: beerStyle.name,
      playlist: {
        name: playlist.name,
        tracks: this.mapTracks(tracks.items)
      }
    };

    return playlistMapped;
  }

  private mapTracks(tracks: any[]): Tracks[] {
    const tracksMapped = tracks.map((item) => {
      const track = {
        name: item.track.name,
        artist: item.track.artists[0].name,
        link: item.track.artists[0].external_urls.spotify
      };

      return track;
    });

    return tracksMapped;
  }
}
