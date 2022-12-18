export interface SpotifyApi {
  getToken: () => Promise<any>;
  getPlaylistsByBeerStyle: (beerStyle: string) => Promise<any>;
  getPlaylistTracks: (id: string) => Promise<any>;
}
