import { IValidatorAdapter } from "@/presentation/interfaces";

export const makeValidatorAdapter = (): IValidatorAdapter => {
  class ValidatorAdpaterStub implements IValidatorAdapter {
    validate(_body: any): undefined | string | string[] {
      return undefined;
    }
  }
  return new ValidatorAdpaterStub();
};
