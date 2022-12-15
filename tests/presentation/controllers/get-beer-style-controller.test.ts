import { IGetBeerStyleService } from "@/application/interfaces";
import {
  getRequestMock,
  getServiceResponseMock,
  makeGetBeerStyleService
} from "@/tests/presentation/mocks";
import { GetBeerStyleController } from "@/presentation/controller";
import { MissinParamError, ServerError } from "@/presentation/errors";

describe("GetBeerStyleController", () => {
  let sut: GetBeerStyleController;
  let getBeerStyleService: IGetBeerStyleService;

  beforeAll(() => {
    getBeerStyleService = makeGetBeerStyleService();
  });

  beforeEach(() => {
    sut = new GetBeerStyleController(getBeerStyleService);
  });

  test("Should return 400 if id is not informed", async () => {
    const httpRequest = {};

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissinParamError("id"));
  });

  test("Should Call GetBeerStyleService with correct params", async () => {
    const getSpy = jest.spyOn(getBeerStyleService, "get");

    await sut.handle(getRequestMock);

    expect(getSpy).toHaveBeenCalledWith(getRequestMock.params.id);
  });

  test("Should return 500 if GetBeerStyleService throws", async () => {
    jest.spyOn(getBeerStyleService, "get").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(getRequestMock);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(getRequestMock);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(getServiceResponseMock);
  });

  test("Should return 404 if beer style not found", async () => {
    jest.spyOn(getBeerStyleService, "get").mockResolvedValueOnce(null);

    const result = await sut.handle(getRequestMock);

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual("Não encontrado");
  });
});
