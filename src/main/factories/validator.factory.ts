import { ValidatorAdapter, JoiSchemaValidator } from "@/infra/validator";
import { IValidatorAdapter } from "@/presentation/interfaces";

import { Schema } from "joi";

export const makeValidatorAdapter = (schema: Schema): IValidatorAdapter => {
  const validator = new JoiSchemaValidator(schema);
  return new ValidatorAdapter(validator);
};
