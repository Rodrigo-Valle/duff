import { GetPlaylistByTemperatureService } from "@/application/services/playlist";
import { GetPlaylistByTemperatureController } from "@/presentation/controller/playlist/get-playlist-by-temperature.controller";
import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { IController } from "@/presentation/interfaces";
import { PostgresBeerStyleRepository } from "@/infra/repositories";
import { AxiosHttpClient, SpotifyApiGateway } from "@/infra/gateways";
import { makeValidatorAdapter } from "../validator.factory";
import { getPlaylistByTemperatureSchema } from "@/infra/validator/joiSchemas/get-playlist-by-temperature.schema";

export const makeGetPlaylistByTemperatureController = (): IController => {
  const repository = new PostgresBeerStyleRepository(PostgresDataSource);
  const client = new AxiosHttpClient();
  const spotifyApi = new SpotifyApiGateway(client);
  const service = new GetPlaylistByTemperatureService(repository, spotifyApi);
  const validator = makeValidatorAdapter(getPlaylistByTemperatureSchema);
  return new GetPlaylistByTemperatureController(service, validator);
};
