import { GetAllBeerStyle } from "@/domain/usecases/beer-style";
import { ServerError } from "@/presentation/errors";
import { GetAllBeerStyleController } from "@/presentation/controller";
import {
  getAllRequest,
  getAllServiceResponse,
  makeGetAllBeerStyleService
} from "@/tests/presentation/mocks";

describe("GetAllBeerStyleController", () => {
  let sut: GetAllBeerStyleController;
  let serviceStub: GetAllBeerStyle;

  beforeAll(() => {
    serviceStub = makeGetAllBeerStyleService();
  });

  beforeEach(() => {
    sut = new GetAllBeerStyleController(serviceStub);
  });

  test("Should Call GetAllBeerStyleService", async () => {
    const getAllSpy = jest.spyOn(serviceStub, "getAll");

    await sut.handle(getAllRequest);

    expect(getAllSpy).toHaveBeenCalled();
  });

  test("Should return 500 if GetAllBeerStyleService throws", async () => {
    jest.spyOn(serviceStub, "getAll").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(getAllRequest);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(getAllRequest);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(getAllServiceResponse);
  });
});
