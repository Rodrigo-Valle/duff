export interface IValidatorAdapter {
  validate: (body: any) => undefined | string | string[];
}
