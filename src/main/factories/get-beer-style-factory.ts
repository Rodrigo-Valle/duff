import { IController } from "@/presentation/interfaces";
import { GetBeerStyleController } from "@/presentation/controller";
import { GetBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

export const makeGetBeerStyleController = (): IController => {
  const getBeerStyleRepository = new BeerStyleRepository(PostgresDataSource);
  const getBeerStyleService = new GetBeerStyleService(getBeerStyleRepository);
  return new GetBeerStyleController(getBeerStyleService);
};
