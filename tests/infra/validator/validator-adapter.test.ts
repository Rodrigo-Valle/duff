import { ValidatorAdapter } from "@/infra/validator";
import { IValidator } from "@/infra/interfaces";
import { makeValidatorMock } from "@/tests/infra/mocks/validator-mock";

describe("ValidatorAdapter tests", () => {
  let sut: ValidatorAdapter;
  let validator: IValidator;

  beforeAll(() => {
    validator = makeValidatorMock();
    sut = new ValidatorAdapter(validator);
  });

  test("Should retunr an string if validator return an string", () => {
    jest.spyOn(validator, "isValid").mockReturnValueOnce("teste");

    const result = sut.validate({});
    expect(result).toBe("teste");
  });

  test("Should return undefined if validator return undefined", () => {
    const result = sut.validate({});
    expect(result).toBe(undefined);
  });
});
