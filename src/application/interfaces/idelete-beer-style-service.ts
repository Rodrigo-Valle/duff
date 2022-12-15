export interface IDeleteBeerStyleService {
  delete: (id: string) => Promise<number | null>;
}
