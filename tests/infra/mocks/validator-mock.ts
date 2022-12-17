import { IValidator } from "@/infra/interfaces";

export const makeValidatorStub = (): IValidator => {
  class ValidatorStub implements IValidator {
    isValid(_body: any): undefined | string | string[] {
      return undefined;
    }
  }
  return new ValidatorStub();
};
