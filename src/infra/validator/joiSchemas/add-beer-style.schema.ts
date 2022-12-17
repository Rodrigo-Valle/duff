import joi, { Schema } from "joi";

export const addBeerStyleSchema: Schema = joi
  .object({
    name: joi.string().required().messages({
      "any.required": "Campo name é obrigatório",
      "string.base": "Campo name deve ser uma string"
    }),
    minTemperature: joi.number().required().messages({
      "any.required": "Campo minTemperature é obrigatório",
      "number.base": "Campo minTemperature deve ser um número"
    }),
    maxTemperature: joi.number().required().messages({
      "any.required": "Campo maxTemperature é obrigatório",
      "number.base": "Campo maxTemperature deve ser um número"
    })
  })
  .messages({
    "object.unknown": "Campo {#key} não é permitido"
  });
