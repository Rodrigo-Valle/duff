import { IGetAllBeerStyleService } from "@/application/interfaces";
import {
  getAllRequestMock,
  getAllServiceResponseMock,
  makeGetAllBeerStyleService
} from "@/tests/presentation/mocks";
import { GetAllBeerStyleController } from "@/presentation/controller";
import { ServerError } from "@/presentation/errors";

describe("GetAllBeerStyleController", () => {
  let sut: GetAllBeerStyleController;
  let GetAllBeerStyleService: IGetAllBeerStyleService;

  beforeAll(() => {
    GetAllBeerStyleService = makeGetAllBeerStyleService();
  });

  beforeEach(() => {
    sut = new GetAllBeerStyleController(GetAllBeerStyleService);
  });

  test("Should Call GetAllBeerStyleService", async () => {
    const getAllSpy = jest.spyOn(GetAllBeerStyleService, "getAll");

    await sut.handle(getAllRequestMock);

    expect(getAllSpy).toHaveBeenCalled();
  });

  test("Should return 500 if GetAllBeerStyleService throws", async () => {
    jest.spyOn(GetAllBeerStyleService, "getAll").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(getAllRequestMock);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(getAllRequestMock);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(getAllServiceResponseMock);
  });
});
