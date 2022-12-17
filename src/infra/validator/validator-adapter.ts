import { IValidatorAdapter } from "@/presentation/interfaces/ivalidator-adapter";
import { IValidator } from "@/infra/interfaces/ivalidator";

export class ValidatorAdapter implements IValidatorAdapter {
  constructor(private readonly Validator: IValidator) {}

  validate(body: any): undefined | string | string[] {
    return this.Validator.isValid(body);
  }
}
