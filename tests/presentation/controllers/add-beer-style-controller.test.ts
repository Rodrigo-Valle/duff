import { IAddBeerStyleService } from "@/application/interfaces";
import {
  addBeerStyleServiceResponseMock,
  makeAddBeerStyleService,
  addBeerStyleRequestMock
} from "@/tests/presentation/mocks";
import { AddBeerStyleController } from "@/presentation/controller";
import { MissinParamError, IsNotANumberError, ServerError } from "@/presentation/errors";

describe("AddBeerStyleController", () => {
  let sut: AddBeerStyleController;
  let addBeerStyleService: IAddBeerStyleService;

  beforeAll(() => {
    addBeerStyleService = makeAddBeerStyleService();
  });

  beforeEach(() => {
    sut = new AddBeerStyleController(addBeerStyleService);
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

  test("Should Call AddBeerStyleService with correct values", async () => {
    const addSpy = jest.spyOn(addBeerStyleService, "add");

    await sut.handle(addBeerStyleRequestMock);

    expect(addSpy).toHaveBeenCalledWith(addBeerStyleRequestMock.body);
  });

  test("Should return 500 if AddBeerStyleService throws", async () => {
    jest.spyOn(addBeerStyleService, "add").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(addBeerStyleRequestMock);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 201 if success", async () => {
    const result = await sut.handle(addBeerStyleRequestMock);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(addBeerStyleServiceResponseMock);
  });
});
