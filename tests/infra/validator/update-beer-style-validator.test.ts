import { JoiSchemaValidation } from "@/infra/validator/joi-validator/joi-schema-validator";
import { updateBeerStyleSchema } from "@/infra/validator/joi-validator";

describe("UpdateBeerStyleSchemaValidation tests", () => {
  let sut: JoiSchemaValidation;
  beforeAll(() => {
    sut = new JoiSchemaValidation(updateBeerStyleSchema);
  });

  test("Should return an string if body is empty", () => {
    const result = sut.isValid({});

    expect(result).toBe("Corpo está vazio");
  });

  test("Should return an string if name is not a string", () => {
    const result = sut.isValid({
      maxTemperature: 10,
      minTemperature: 10,
      name: true
    });

    expect(result).toEqual(["Campo name deve ser uma string"]);
  });

  test("Should return an string if minTemperature is NaN", () => {
    const result = sut.isValid({
      maxTemperature: 10,
      minTemperature: "NaN",
      name: "teste"
    });

    expect(result).toEqual(["Campo minTemperature deve ser um número"]);
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
