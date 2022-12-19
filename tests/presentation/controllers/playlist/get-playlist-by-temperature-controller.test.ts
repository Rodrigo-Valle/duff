import { GetPlaylistByTemperature } from "@/domain/usecases/playlist";
import { GetPlaylistByTemperatureController } from "@/presentation/controller/playlist";
import { ServerError } from "@/presentation/errors";
import { IValidatorAdapter } from "@/presentation/interfaces";
import {
  makeValidatorAdapter,
  makeGetPlaylistByTemperatureService,
  getPlaylistRequest,
  serviceResponse
} from "@/tests/presentation/mocks";

describe("GetPlaylistByTemperatureController", () => {
  let sut: GetPlaylistByTemperatureController;
  let serviceStub: GetPlaylistByTemperature;
  let validator: IValidatorAdapter;

  beforeAll(() => {
    serviceStub = makeGetPlaylistByTemperatureService();
    validator = makeValidatorAdapter();
  });

  beforeEach(() => {
    sut = new GetPlaylistByTemperatureController(serviceStub, validator);
  });

  test("Should return 400 if validator returns an error", async () => {
    jest.spyOn(validator, "validate").mockReturnValueOnce("error");

    const result = await sut.handle(getPlaylistRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ message: "error" });
  });

  test("Should Call Validator with correct values", async () => {
    const addSpy = jest.spyOn(validator, "validate");

    await sut.handle(getPlaylistRequest);

    expect(addSpy).toHaveBeenCalledWith(getPlaylistRequest.query);
  });

  test("Should Call GetPlaylistByTemperatureService with correct params", async () => {
    const getSpy = jest.spyOn(serviceStub, "get");

    await sut.handle(getPlaylistRequest);

    expect(getSpy).toHaveBeenCalledWith(getPlaylistRequest.query.temperature);
  });

  test("Should return 500 if GetPlaylistByTemperatureService throws", async () => {
    jest.spyOn(serviceStub, "get").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(getPlaylistRequest);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(getPlaylistRequest);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(serviceResponse);
  });

  test("Should return 404 if playlist not found", async () => {
    jest.spyOn(serviceStub, "get").mockResolvedValueOnce(null);

    const result = await sut.handle(getPlaylistRequest);

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ message: "Não encontrado" });
  });
});
