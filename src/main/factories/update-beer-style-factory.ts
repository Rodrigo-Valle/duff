import { IController } from "@/presentation/interfaces";
import { UpdateBeerStyleController } from "@/presentation/controller";
import { UpdateBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

export const makeUpdateBeerStyleController = (): IController => {
  const updateBeerStyleRepository = new BeerStyleRepository(PostgresDataSource);
  const updateBeerStyleService = new UpdateBeerStyleService(updateBeerStyleRepository);
  return new UpdateBeerStyleController(updateBeerStyleService);
};
