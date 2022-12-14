import { AddBeerStyleController } from "@/presentation/controller";
import { MissinParamError, IsNotANumberError } from "@/presentation/errors";

describe("AddBeerStyleController", () => {
  let sut: AddBeerStyleController;

  beforeEach(() => {
    sut = new AddBeerStyleController();
  });

  test("Should return 400 if name is not provided", async () => {
    const httpRequest = {
      body: {
        minTemperature: "0",
        maxTemperature: "1"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissinParamError("name"));
  });

  test("Should return 400 if minTemperature is not provided", async () => {
    const httpRequest = {
      body: {
        name: "any_name",
        maxTemperature: "1"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissinParamError("minTemperature"));
  });

  test("Should return 400 if maxTemperature is not provided ", async () => {
    const httpRequest = {
      body: {
        name: "any_name",
        minTemperature: "0"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissinParamError("maxTemperature"));
  });

  test("Should return 400 if minTemperature is not a number", async () => {
    const httpRequest = {
      body: {
        name: "any_name",
        minTemperature: "NAN",
        maxTemperature: "10"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new IsNotANumberError("NAN"));
  });

  test("Should return 400 if maxTemperature is not a number", async () => {
    const httpRequest = {
      body: {
        name: "any_name",
        minTemperature: "0",
        maxTemperature: "NAN"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new IsNotANumberError("NAN"));
  });
});
