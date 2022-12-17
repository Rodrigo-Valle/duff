import joi, { Schema } from "joi";

export const updateBeerStyleSchema: Schema = joi
  .object({
    name: joi.string().messages({
      "string.base": "Campo name deve ser uma string"
    }),
    minTemperature: joi.number().messages({
      "number.base": "Campo minTemperature deve ser um número"
    }),
    maxTemperature: joi.number().messages({
      "number.base": "Campo maxTemperature deve ser um número"
    })
  })
  .messages({
    "object.unknown": "Campo {#key} não é permitido"
  });
