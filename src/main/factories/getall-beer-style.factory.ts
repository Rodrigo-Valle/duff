import { IController } from "@/presentation/interfaces";
import { GetAllBeerStyleController } from "@/presentation/controller";
import { GetAllBeerStyleService } from "@/application/services/beer-style";
import { PostgresBeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

export const makeGetAllBeerStyleController = (): IController => {
  const getAllBeerStyleRepository = new PostgresBeerStyleRepository(PostgresDataSource);
  const getAllBeerStyleService = new GetAllBeerStyleService(getAllBeerStyleRepository);
  return new GetAllBeerStyleController(getAllBeerStyleService);
};
