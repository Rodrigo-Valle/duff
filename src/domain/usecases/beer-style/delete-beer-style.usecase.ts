export interface DeleteBeerStyle {
  delete: (id: string) => Promise<number | null>;
}
