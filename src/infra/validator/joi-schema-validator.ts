import { IValidator } from "@/infra/interfaces/ivalidator";
import Joi, { Schema, ValidationErrorItem } from "joi";

export class JoiSchemaValidator implements IValidator {
  constructor(private readonly schema: Schema) {}

  isValid(body: any): undefined | string | string[] {
    try {
      if (Object.keys(body).length === 0) return "Não foi informado nenhum parâmetro";

      Joi.assert(body, this.schema, { abortEarly: false });
    } catch (error: any) {
      if (Joi.isError(error)) {
        const { details } = error;
        const detail = details.map((i: ValidationErrorItem) => i.message);
        return detail;
      }
      throw error;
    }
  }
}
