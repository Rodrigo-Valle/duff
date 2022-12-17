import { IAddBeerStyleService } from "@/application/interfaces";
import {
  addBeerStyleServiceResponseMock,
  makeAddBeerStyleService,
  addBeerStyleRequestMock,
  makeValidatorAdapter
} from "@/tests/presentation/mocks";
import { AddBeerStyleController } from "@/presentation/controller";
import { ServerError } from "@/presentation/errors";
import { IValidatorAdapter } from "@/presentation/interfaces";

describe("AddBeerStyleController", () => {
  let sut: AddBeerStyleController;
  let addBeerStyleService: IAddBeerStyleService;
  let validator: IValidatorAdapter;

  beforeAll(() => {
    addBeerStyleService = makeAddBeerStyleService();
    validator = makeValidatorAdapter();
  });

  beforeEach(() => {
    sut = new AddBeerStyleController(addBeerStyleService, validator);
  });

  test("Should return 400 if validator returns an error", async () => {
    jest.spyOn(validator, "validate").mockReturnValueOnce("teste");

    const result = await sut.handle(addBeerStyleRequestMock);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ message: "teste" });
  });

  test("Should Call Validator with correct values", async () => {
    const addSpy = jest.spyOn(validator, "validate");

    await sut.handle(addBeerStyleRequestMock);

    expect(addSpy).toHaveBeenCalledWith(addBeerStyleRequestMock.body);
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
