import { IDeleteBeerStyleService } from "@/application/interfaces";
import { deleteRequestMock, makeDeleteBeerStyleService } from "@/tests/presentation/mocks";
import { DeleteBeerStyleController } from "@/presentation/controller";
import { ServerError } from "@/presentation/errors";

describe("DeleteBeerStyleController", () => {
  let sut: DeleteBeerStyleController;
  let deleteBeerStyleService: IDeleteBeerStyleService;

  beforeAll(() => {
    deleteBeerStyleService = makeDeleteBeerStyleService();
  });

  beforeEach(() => {
    sut = new DeleteBeerStyleController(deleteBeerStyleService);
  });

  test("Should Call DeleteBeerStyleService with correct params", async () => {
    const deleteSpy = jest.spyOn(deleteBeerStyleService, "delete");

    await sut.handle(deleteRequestMock);

    expect(deleteSpy).toHaveBeenCalledWith(deleteRequestMock.params.id);
  });

  test("Should return 500 if DeleteBeerStyleService throws", async () => {
    jest.spyOn(deleteBeerStyleService, "delete").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(deleteRequestMock);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 200 if success", async () => {
    const result = await sut.handle(deleteRequestMock);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      message: "Estilo(s) removido(s) com sucesso, quantidade removida: 1"
    });
  });

  test("Should return 404 if beer style not found", async () => {
    jest.spyOn(deleteBeerStyleService, "delete").mockResolvedValueOnce(null);

    const result = await sut.handle(deleteRequestMock);

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ message: "Não encontrado" });
  });
});
