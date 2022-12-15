import { IController } from "@/presentation/interfaces";
import { AddBeerStyleController } from "@/presentation/controller";
import { AddBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

export const makeAddBeerStyleController = (): IController => {
  const addBeerStyleRepository = new BeerStyleRepository(PostgresDataSource);
  const addBeerStyleService = new AddBeerStyleService(addBeerStyleRepository);
  return new AddBeerStyleController(addBeerStyleService);
};
