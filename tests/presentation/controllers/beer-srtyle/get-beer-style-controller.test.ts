import { GetBeerStyle } from "@/domain/usecases/beer-style";
import { GetBeerStyleController } from "@/presentation/controller/beer-style";
import { ServerError } from "@/presentation/errors";
import {
  requestWithId,
  beerStyleResponse,
  makeGetBeerStyleService
} from "@/tests/presentation/mocks";

describe("GetBeerStyleController", () => {
  let sut: GetBeerStyleController;
  let serviceStub: GetBeerStyle;

  beforeAll(() => {
    serviceStub = makeGetBeerStyleService();
  });

  beforeEach(() => {
    sut = new GetBeerStyleController(serviceStub);
  });

  test("Should Call GetBeerStyleService with correct params", async () => {
    const getSpy = jest.spyOn(serviceStub, "get");

    await sut.handle(requestWithId);

    expect(getSpy).toHaveBeenCalledWith(requestWithId.params.id);
  });

  test("Should return 500 if GetBeerStyleService throws", async () => {
    jest.spyOn(serviceStub, "get").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(requestWithId);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(requestWithId);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(beerStyleResponse);
  });

  test("Should return 404 if beer style not found", async () => {
    jest.spyOn(serviceStub, "get").mockResolvedValueOnce(null);

    const result = await sut.handle(requestWithId);

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ message: "Não encontrado" });
  });
});
