import { IController } from "@/presentation/interfaces";
import { AddBeerStyleController } from "@/presentation/controller";
import { AddBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { makeValidatorAdapter } from "@/main/factories";
import { addBeerStyleSchema } from "@/infra/validator/joi-validator";

export const makeAddBeerStyleController = (): IController => {
  const addBeerStyleRepository = new BeerStyleRepository(PostgresDataSource);
  const addBeerStyleService = new AddBeerStyleService(addBeerStyleRepository);
  const validator = makeValidatorAdapter(addBeerStyleSchema);
  return new AddBeerStyleController(addBeerStyleService, validator);
};
