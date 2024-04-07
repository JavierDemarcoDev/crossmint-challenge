import EventEmitter from "events";
import { Astral, AstralBodies } from "../types";
import {
  AstralService,
  ComethService,
  GoalMapService,
  PolyanetService,
  SoloonService,
} from "./Megaverse";
import { ApiRequest, AstralBodyMethods } from "./ServiceBase";

class AstralUoW {
  private comethService: ComethService;
  private goalMapService: GoalMapService;
  private polyanetService: PolyanetService;
  private soloonService: SoloonService;
  astralService: AstralService;

  constructor() {
    this.comethService = new ComethService();
    this.goalMapService = new GoalMapService();
    this.polyanetService = new PolyanetService();
    this.soloonService = new SoloonService();
    this.astralService = new AstralService();
  }

  async astralRequest(
    req: ApiRequest,
    type: AstralBodies,
    method: AstralBodyMethods
  ) {
    switch (type) {
      case AstralBodies.POLYANET:
        if (method === AstralBodyMethods.POST)
          return await this.polyanetService.createPolyanet(req);
        if (method === AstralBodyMethods.DELETE)
          return await this.polyanetService.removePolyanet(req);

      case AstralBodies.SOLOON:
        if (method === AstralBodyMethods.POST)
          return await this.soloonService.createSoloon(req);
        if (method === AstralBodyMethods.DELETE)
          return await this.soloonService.removeSoolon(req);

      case AstralBodies.COMETH:
        if (method === AstralBodyMethods.POST)
          return await this.comethService.createCometh(req);
        if (method === AstralBodyMethods.DELETE)
          return await this.comethService.removeCometh(req);

      default:
        return new Error("Incorrect megaverse type");
    }
  }

  async goalMapRequest(
    method: AstralBodyMethods,
    event?: EventEmitter,
    init?: Function
  ) {
    switch (method) {
      case AstralBodyMethods.GET_GOAL:
        return await this.goalMapService.getGoalMap();

      case AstralBodyMethods.GET_CURRENT:
        return await this.goalMapService.getCurrentMap();

      case AstralBodyMethods.CHECK:
        return await this.goalMapService.checkAnswer(
          event as EventEmitter,
          init as Function
        );

      default:
        return new Error("Incorrect goal map method");
    }
  }

  async createAstralsToGoalMap(astrals: Astral[], event: EventEmitter) {
    for (let astral of astrals) {
      const type = this.astralService.getType(astral.type as string);

      // Creating astral object depending what type it has
      await this.astralRequest(
        {
          ...astral,
          type,
          color: this.astralService.getColor(type),
          direction: this.astralService.getDirection(type),
        },
        type,
        AstralBodyMethods.POST
      );
    }

    // Notifies the finished calls to the API
    event.emit("finish");
  }
}

export default AstralUoW;
