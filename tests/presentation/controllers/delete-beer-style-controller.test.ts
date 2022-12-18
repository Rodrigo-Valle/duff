import { DeleteBeerStyle } from "@/domain/usecases/beer-style";
import { deleteRequest, makeDeleteBeerStyleService } from "@/tests/presentation/mocks";
import { DeleteBeerStyleController } from "@/presentation/controller";
import { ServerError } from "@/presentation/errors";

describe("DeleteBeerStyleController", () => {
  let sut: DeleteBeerStyleController;
  let serviceStub: DeleteBeerStyle;

  beforeAll(() => {
    serviceStub = makeDeleteBeerStyleService();
  });

  beforeEach(() => {
    sut = new DeleteBeerStyleController(serviceStub);
  });

  test("Should Call DeleteBeerStyleService with correct params", async () => {
    const deleteSpy = jest.spyOn(serviceStub, "delete");

    await sut.handle(deleteRequest);

    expect(deleteSpy).toHaveBeenCalledWith(deleteRequest.params.id);
  });

  test("Should return 500 if DeleteBeerStyleService throws", async () => {
    jest.spyOn(serviceStub, "delete").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(deleteRequest);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(deleteRequest);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      message: "Estilo removido com sucesso"
    });
  });

  test("Should return 404 if beer style not found", async () => {
    jest.spyOn(serviceStub, "delete").mockResolvedValueOnce(null);

    const result = await sut.handle(deleteRequest);

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ message: "Não encontrado" });
  });
});
