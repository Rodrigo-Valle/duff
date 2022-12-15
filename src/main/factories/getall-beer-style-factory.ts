import { IController } from "@/presentation/interfaces";
import { GetAllBeerStyleController } from "@/presentation/controller";
import { GetAllBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

export const makeGetAllBeerStyleController = (): IController => {
  const getAllBeerStyleRepository = new BeerStyleRepository(PostgresDataSource);
  const getAllBeerStyleService = new GetAllBeerStyleService(getAllBeerStyleRepository);
  return new GetAllBeerStyleController(getAllBeerStyleService);
};
