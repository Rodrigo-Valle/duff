import { IHttpResponse } from "@/presentation/interfaces";
import { ServerError } from "@/presentation/errors";

export const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error
  };
};

export const notFound = (): IHttpResponse => {
  return {
    statusCode: 404,
    body: "Não encontrado"
  };
};

export const serverError = (): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  };
};

export const created = (body: any): IHttpResponse => {
  return {
    statusCode: 201,
    body
  };
};

export const ok = (body: any): IHttpResponse => {
  return {
    statusCode: 200,
    body
  };
};
