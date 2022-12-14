export class IsNotANumberError extends Error {
  constructor(paramName: string) {
    super(`is not a number: ${paramName}`);
    this.name = "IsNotANumberError";
  }
}
