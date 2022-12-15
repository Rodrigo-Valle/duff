import { IController } from "@/presentation/interfaces";
import { DeleteBeerStyleController } from "@/presentation/controller";
import { DeleteBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

export const makeDeleteBeerStyleController = (): IController => {
  const deleteBeerStyleRepository = new BeerStyleRepository(PostgresDataSource);
  const deleteBeerStyleService = new DeleteBeerStyleService(deleteBeerStyleRepository);
  return new DeleteBeerStyleController(deleteBeerStyleService);
};
