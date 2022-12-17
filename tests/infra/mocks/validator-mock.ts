import { IValidator } from "../interfaces/ivalidator";

export const makeValidatorMock = (): IValidator => {
  class ValidatorStub implements IValidator {
    isValid(_body: any): undefined | string | string[] {
      return undefined;
    }
  }
  return new ValidatorStub();
};
