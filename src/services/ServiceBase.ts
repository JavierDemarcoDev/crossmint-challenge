import { Response } from "node-fetch";
import { timeOut } from "../helpers";
import { AstralBodies, Colors, Coords, Directions } from "../types";

enum Methods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export enum AstralBodyMethods {
  POST = "POST",
  DELETE = "DELETE",
  CHECK = "CHECK",
  GET_GOAL = "GET_GOAL",
  GET_CURRENT = "GET_CURRENT",
}

export interface ApiRequest extends Coords {
  row: number;
  column: number;
  type?: AstralBodies;
  color?: Colors;
  direction?: Directions;
}

type ResponseError = Response & { message: string };

abstract class ServiceBase {
  protected readonly id: string = process.env.CANDIDATE_ID as string;
  private readonly urlBase: string = process.env.API_URL as string;

  private url(path: string) {
    return new URL(path, this.urlBase);
  }

  private responseError(error: ResponseError) {
    return {
      error: true,
      statusCode: error?.status || 500,
      message: error?.message || error?.statusText || "Internal Server Error",
    };
  }

  protected async get(path: string) {
    try {
      return await this.httpRequest(path, Methods.GET);
    } catch (error) {
      console.log(
        "ERRORED GETTING DATA",
        this.responseError(error as ResponseError)
      );
    }
  }

  protected async create(path: string, req: ApiRequest) {
    try {
      const response = await this.httpRequest(path, Methods.POST, req);
      console.log(`CREATED ${req.type} at: ${req.row},${req.column}`, response);
    } catch (error) {
      console.log(
        "ERRORED CREATED ASTRAL",
        this.responseError(error as ResponseError)
      );
    }
  }

  protected async remove(path: string, req: ApiRequest) {
    try {
      const response = await this.httpRequest(path, Methods.DELETE, req);
      console.log(`REMOVED ${req.type} at: ${req.row},${req.column}`, response);
    } catch (error) {
      console.log(
        "ERRORED REMOVED ASTRAL",
        this.responseError(error as ResponseError)
      );
    }
  }

  protected async validation(path: string) {
    try {
      const response = await this.httpRequest(path, Methods.POST);
      console.log("VALIDATION RESPONSE::", this.id, response);
      return response.solved;
    } catch (error) {
      console.log(
        "ERRORED GETING VALIDATION",
        this.responseError(error as ResponseError)
      );
    }
  }

  protected async httpRequest(path: string, method: Methods, req?: ApiRequest) {
    const response = await fetch(this.url(path), {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: this.parseBody(req),
    });

    const body = await response.json();
    if (response.ok) {
      if (!Boolean(body)) {
        await timeOut(2000);
      }

      return body;
    } else throw body;
  }

  private parseBody(body: Record<string, any> | undefined) {
    if (body) {
      return JSON.stringify(body);
    }
  }
}

export default ServiceBase;
