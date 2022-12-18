import { AddBeerStyle } from "@/domain/usecases/beer-style";
import {
  addBeerStyleServiceResponse,
  makeAddBeerStyleService,
  addBeerStyleRequest,
  makeValidatorAdapter
} from "@/tests/presentation/mocks";
import { AddBeerStyleController } from "@/presentation/controller";
import { ServerError } from "@/presentation/errors";
import { IValidatorAdapter } from "@/presentation/interfaces";

describe("AddBeerStyleController", () => {
  let sut: AddBeerStyleController;
  let serviceStub: AddBeerStyle;
  let validator: IValidatorAdapter;

  beforeAll(() => {
    serviceStub = makeAddBeerStyleService();
    validator = makeValidatorAdapter();
  });

  beforeEach(() => {
    sut = new AddBeerStyleController(serviceStub, validator);
  });

  test("Should return 400 if validator returns an error", async () => {
    jest.spyOn(validator, "validate").mockReturnValueOnce("error");

    const result = await sut.handle(addBeerStyleRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ message: "error" });
  });

  test("Should Call Validator with correct values", async () => {
    const addSpy = jest.spyOn(validator, "validate");

    await sut.handle(addBeerStyleRequest);

    expect(addSpy).toHaveBeenCalledWith(addBeerStyleRequest.body);
  });

  test("Should Call AddBeerStyleService with correct values", async () => {
    const addSpy = jest.spyOn(serviceStub, "add");

    await sut.handle(addBeerStyleRequest);

    expect(addSpy).toHaveBeenCalledWith(addBeerStyleRequest.body);
  });

  test("Should return 500 if AddBeerStyleService throws", async () => {
    jest.spyOn(serviceStub, "add").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(addBeerStyleRequest);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 201 if success", async () => {
    const result = await sut.handle(addBeerStyleRequest);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(addBeerStyleServiceResponse);
  });
});
