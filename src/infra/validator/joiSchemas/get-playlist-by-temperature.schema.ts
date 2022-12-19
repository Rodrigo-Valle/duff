import joi, { Schema } from "joi";

export const getPlaylistByTemperatureSchema: Schema = joi
  .object({
    temperature: joi.number().required().messages({
      "any.required": "Campo temperature é obrigatório",
      "number.base": "Campo temperature deve ser um número"
    })
  })
  .messages({
    "any.required": "obrigatório informar uma temperatura",
    "object.unknown": "Campo {#key} não é permitido"
  });
