import { Tracks } from "@/domain/models";

export interface Playlist {
  beerStyle: string;
  playlist: {
    name: string;
    tracks: Tracks[];
  };
}
