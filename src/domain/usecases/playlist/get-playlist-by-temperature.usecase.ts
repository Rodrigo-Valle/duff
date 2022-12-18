import { Playlist } from "@/domain/models";

export interface GetPlaylistByTemperature {
  get: (temperature: number) => Promise<Playlist>;
}
