import { IUpdateBeerStyleService } from "@/application/interfaces";
import {
  updateRequestMock,
  updateServiceResponseMock,
  makeUpdateBeerStyleService,
  makeValidatorAdapter
} from "@/tests/presentation/mocks";
import { UpdateBeerStyleController } from "@/presentation/controller";
import { ServerError } from "@/presentation/errors";
import { IValidatorAdapter } from "../interfaces";

describe("UpdateBeerStyleController", () => {
  let sut: UpdateBeerStyleController;
  let updateBeerStyleService: IUpdateBeerStyleService;
  let validator: IValidatorAdapter;

  beforeAll(() => {
    updateBeerStyleService = makeUpdateBeerStyleService();
    validator = makeValidatorAdapter();
  });

  beforeEach(() => {
    sut = new UpdateBeerStyleController(updateBeerStyleService, validator);
  });

  test("Should return 400 if validator returns a string", async () => {
    jest.spyOn(validator, "validate").mockReturnValueOnce("teste");

    const result = await sut.handle(updateRequestMock);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ message: "teste" });
  });

  test("Should Call UpdateBeerStyleService with correct params", async () => {
    const updateSpy = jest.spyOn(updateBeerStyleService, "update");

    await sut.handle(updateRequestMock);

    expect(updateSpy).toHaveBeenCalledWith(updateRequestMock.body, updateRequestMock.params.id);
  });

  test("Should return 500 if UpdateBeerStyleService throws", async () => {
    jest.spyOn(updateBeerStyleService, "update").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(updateRequestMock);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(updateRequestMock);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(updateServiceResponseMock);
  });

  test("Should return 404 if beer style not found", async () => {
    jest.spyOn(updateBeerStyleService, "update").mockResolvedValueOnce(null);

    const result = await sut.handle(updateRequestMock);

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ message: "Não encontrado" });
  });
});
