import { UpdateBeerStyle } from "@/domain/usecases";
import {
  updateRequest,
  updateServiceResponse,
  makeUpdateBeerStyleService,
  makeValidatorAdapter
} from "@/tests/presentation/mocks";
import { UpdateBeerStyleController } from "@/presentation/controller";
import { ServerError } from "@/presentation/errors";
import { IValidatorAdapter } from "../interfaces";

describe("UpdateBeerStyleController", () => {
  let sut: UpdateBeerStyleController;
  let serviceStub: UpdateBeerStyle;
  let validator: IValidatorAdapter;

  beforeAll(() => {
    serviceStub = makeUpdateBeerStyleService();
    validator = makeValidatorAdapter();
  });

  beforeEach(() => {
    sut = new UpdateBeerStyleController(serviceStub, validator);
  });

  test("Should return 400 if validator returns a string", async () => {
    jest.spyOn(validator, "validate").mockReturnValueOnce("teste");

    const result = await sut.handle(updateRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ message: "teste" });
  });

  test("Should Call UpdateBeerStyleService with correct params", async () => {
    const updateSpy = jest.spyOn(serviceStub, "update");

    await sut.handle(updateRequest);

    expect(updateSpy).toHaveBeenCalledWith(updateRequest.body, updateRequest.params.id);
  });

  test("Should return 500 if UpdateBeerStyleService throws", async () => {
    jest.spyOn(serviceStub, "update").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(updateRequest);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(updateRequest);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(updateServiceResponse);
  });

  test("Should return 404 if beer style not found", async () => {
    jest.spyOn(serviceStub, "update").mockResolvedValueOnce(null);

    const result = await sut.handle(updateRequest);

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ message: "Não encontrado" });
  });
});
