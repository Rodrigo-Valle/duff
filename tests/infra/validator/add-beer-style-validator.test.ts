import { JoiSchemaValidator } from "@/infra/validator/joi-schema-validator";
import { addBeerStyleSchema } from "@/infra/validator/joiSchemas/add-beer-style.schema";

describe("AddBeerStyleSchemaValidation tests", () => {
  let sut: JoiSchemaValidator;
  beforeAll(() => {
    sut = new JoiSchemaValidator(addBeerStyleSchema);
  });

  test("Should return an string if body is empty", () => {
    const result = sut.isValid({});

    expect(result).toBe("Não foi informado nenhum parâmetro");
  });

  test("Should return an string if name is not informed", () => {
    const result = sut.isValid({
      maxTemperature: 10,
      minTemperature: 1
    });

    expect(result).toEqual(["Campo name é obrigatório"]);
  });

  test("Should return an string if minTemperature is not informed", () => {
    const result = sut.isValid({
      name: "teste",
      maxTemperature: 10
    });

    expect(result).toEqual(["Campo minTemperature é obrigatório"]);
  });

  test("Should return an string if minTemperature is NaN", () => {
    const result = sut.isValid({
      maxTemperature: 10,
      minTemperature: "NaN",
      name: "teste"
    });

    expect(result).toEqual(["Campo minTemperature deve ser um número"]);
  });

  test("Should return an string if maxTemperature not informed", () => {
    const result = sut.isValid({
      minTemperature: 1,
      name: "teste"
    });

    expect(result).toEqual(["Campo maxTemperature é obrigatório"]);
  });

  test("Should return an string if maxTemperature is NaN", () => {
    const result = sut.isValid({
      maxTemperature: "NaN",
      minTemperature: 1,
      name: "teste"
    });

    expect(result).toEqual(["Campo maxTemperature deve ser um número"]);
  });

  test("Should return an string if other parameters are informed", () => {
    const result = sut.isValid({
      other_parameter: "any_value",
      maxTemperature: 10,
      minTemperature: 1,
      name: "teste"
    });

    expect(result).toEqual(["Campo other_parameter não é permitido"]);
  });
});
