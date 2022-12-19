export interface SpotifyApi {
  getPlaylistsByBeerStyle: (beerStyle: string) => Promise<getPlaylistsByBeerStyleReturn | null>;
  getPlaylistTracks: (id: string) => Promise<getPlaylistTracksReturn>;
}

export interface getPlaylistsByBeerStyleReturn {
  id: string;
  name: string;
}

export interface getPlaylistTracksReturn {
  items: Track[];
}

export interface Track {
  artists: Artists[];
  name: string;
}

interface Artists {
  external_urls: {
    spotify: string;
  };
  name: string;
}
