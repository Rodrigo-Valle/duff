export interface SpotifyApi {
  getPlaylistsByBeerStyle: (beerStyle: string) => Promise<any>;
  getPlaylistTracks: (id: string) => Promise<any>;
}
