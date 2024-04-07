import ServiceBase, { ApiRequest } from "../ServiceBase";

export class ComethService extends ServiceBase {
  private readonly PATH = "comeths";

  async createCometh(req: ApiRequest) {
    return await this.create(this.PATH, req);
  }

  async removeCometh(req: ApiRequest) {
    return await this.remove(this.PATH, req);
  }
}
