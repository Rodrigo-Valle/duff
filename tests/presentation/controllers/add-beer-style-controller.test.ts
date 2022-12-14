import { AddBeerStyleController } from "@/presentation/controller";
import { MissinParamError } from "@/presentation/errors/missing-param";

describe("AddBeerStyleController", () => {
  let sut: AddBeerStyleController;

  beforeEach(() => {
    sut = new AddBeerStyleController();
  });

  test("Should return 400 if name is not provided", async () => {
    const httpRequest = {
      body: {
        minTemperature: "any_minTemperature",
        maxTemperature: "any_maxTemperature"
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
        maxTemperature: "any_maxTemperature"
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
        minTemperature: "any_minTemperature"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissinParamError("maxTemperature"));
  });
});
