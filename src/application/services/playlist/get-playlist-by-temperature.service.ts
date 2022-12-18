import { BeerStyleRepository, SpotifyApi } from "@/application/interfaces";
import { GetPlaylistByTemperature } from "@/domain/usecases/playlist";

export class GetPlaylistByTemperatureService implements GetPlaylistByTemperature {
  constructor(
    private readonly repository: BeerStyleRepository,
    private readonly spotifyApi: SpotifyApi
  ) {}

  async get(temperature: number): Promise<any> {
    const beerStyle = await this.repository.findByTemperatureAverage(temperature);

    await this.spotifyApi.getPlaylistsByBeerStyle(beerStyle.name);
  }
}
