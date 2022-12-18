import { BeerStyleRepository } from "@/application/interfaces";
import { GetPlaylistByTemperature } from "@/domain/usecases/playlist";

export class GetPlaylistByTemperatureService implements GetPlaylistByTemperature {
  constructor(private readonly repository: BeerStyleRepository) {}

  async get(temperature: number): Promise<any> {
    await this.repository.findByTemperatureAverage(temperature);
  }
}
