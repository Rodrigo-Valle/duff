import { IController } from "@/presentation/interfaces";
import { UpdateBeerStyleController } from "@/presentation/controller";
import { UpdateBeerStyleService } from "@/application/services";
import { BeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { makeValidatorAdapter } from "./validator-factory";
import { updateBeerStyleSchema } from "@/infra/validator/joi-validator";

export const makeUpdateBeerStyleController = (): IController => {
  const updateBeerStyleRepository = new BeerStyleRepository(PostgresDataSource);
  const updateBeerStyleService = new UpdateBeerStyleService(updateBeerStyleRepository);
  const validator = makeValidatorAdapter(updateBeerStyleSchema);
  return new UpdateBeerStyleController(updateBeerStyleService, validator);
};
