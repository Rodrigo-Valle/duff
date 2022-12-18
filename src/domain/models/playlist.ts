export interface Playlist {
  beerStyle: string;
  playlist: {
    name: string;
    tracks: Tracks[];
  };
}

export interface Tracks {
  name: string;
  artist: string;
  link: string;
}
