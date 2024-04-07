import ServiceBase, { ApiRequest } from "../ServiceBase";

export class PolyanetService extends ServiceBase {
  private readonly PATH = "polyanets";

  async createPolyanet(req: ApiRequest) {
    return await this.create(this.PATH, req);
  }

  async removePolyanet(req: ApiRequest) {
    return await this.remove(this.PATH, req);
  }
}
