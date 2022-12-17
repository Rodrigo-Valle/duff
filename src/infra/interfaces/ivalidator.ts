export interface IValidator {
  isValid: (body: any) => undefined | string | string[];
}
