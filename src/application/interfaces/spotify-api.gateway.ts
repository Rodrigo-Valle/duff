export interface SpotifyApi {
  getToken: () => Promise<any>;
  getPlaylistsByBeerStyle: (beerStyle: string) => Promise<any>;
}
