import { IController } from "@/presentation/interfaces";
import { UpdateBeerStyleController } from "@/presentation/controller/beer-style";
import { UpdateBeerStyleService } from "@/application/services/beer-style";
import { PostgresBeerStyleRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";
import { updateBeerStyleSchema } from "@/infra/validator/joiSchemas";
import { makeValidatorAdapter } from "@/main/factories";

export const makeUpdateBeerStyleController = (): IController => {
  const updateBeerStyleRepository = new PostgresBeerStyleRepository(PostgresDataSource);
  const updateBeerStyleService = new UpdateBeerStyleService(updateBeerStyleRepository);
  const validator = makeValidatorAdapter(updateBeerStyleSchema);
  return new UpdateBeerStyleController(updateBeerStyleService, validator);
};
