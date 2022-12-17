import { ValidatorAdapter } from "@/infra/validator";
import { IValidatorAdapter } from "@/presentation/interfaces";
import { JoiSchemaValidation } from "@/infra/validator/joi-validator";
import { Schema } from "joi";

export const makeValidatorAdapter = (schema: Schema): IValidatorAdapter => {
  const validator = new JoiSchemaValidation(schema);
  return new ValidatorAdapter(validator);
};
