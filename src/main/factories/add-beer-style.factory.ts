import { IController } from "@/presentation/interfaces";
import { AddBeerStyleController } from "@/presentation/controller";
import { AddBeerStyleService } from "@/application/services/beer-style";
import { PostgresBeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { addBeerStyleSchema } from "@/infra/validator/joiSchemas";
import { makeValidatorAdapter } from "@/main/factories";

export const makeAddBeerStyleController = (): IController => {
  const addBeerStyleRepository = new PostgresBeerStyleRepository(PostgresDataSource);
  const addBeerStyleService = new AddBeerStyleService(addBeerStyleRepository);
  const validator = makeValidatorAdapter(addBeerStyleSchema);
  return new AddBeerStyleController(addBeerStyleService, validator);
};
