import { IController } from "@/presentation/interfaces";
import { GetBeerStyleController } from "@/presentation/controller/beer-style";
import { GetBeerStyleService } from "@/application/services/beer-style";
import { PostgresBeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

export const makeGetBeerStyleController = (): IController => {
  const getBeerStyleRepository = new PostgresBeerStyleRepository(PostgresDataSource);
  const getBeerStyleService = new GetBeerStyleService(getBeerStyleRepository);
  return new GetBeerStyleController(getBeerStyleService);
};
