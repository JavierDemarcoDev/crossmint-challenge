import ServiceBase, { ApiRequest } from "../ServiceBase";

export class SoloonService extends ServiceBase {
  private readonly PATH = "soloons";

  async createSoloon(req: ApiRequest) {
    return await this.create(this.PATH, req);
  }

  async removeSoolon(req: ApiRequest) {
    return await this.remove(this.PATH, req);
  }
}
