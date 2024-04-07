import { timeOut } from "../../helpers";
import { CurrentMap, GoalMap } from "../../types";
import ServiceBase from "../ServiceBase";
import EventEmitter from "events";

export class GoalMapService extends ServiceBase {
  private readonly PATH_GOAL = `map/${this.id}/goal`;
  private readonly PATH_CURRENT = `map/${this.id}`;
  private readonly PATH_VALIDATE = `map/${this.id}/validate`;

  async getGoalMap(): Promise<GoalMap> {
    return await this.get(this.PATH_GOAL);
  }

  async getCurrentMap(): Promise<CurrentMap> {
    const response = await this.get(this.PATH_CURRENT);
    return response.map;
  }

  async checkAnswer(event: EventEmitter, init: Function) {
    const validation = await this.validation(this.PATH_VALIDATE);
    // UNDEFINED RESPONSE
    // Means invalid request - So is avoiding the rate limit and trigger again
    if (validation === undefined) {
      await timeOut(1000);
      event.emit("finish");
    }

    // FALSE RESPONSE
    // All API request was made but not all the astrals were created
    // So then the program start again with new current map
    if (validation === false) {
      console.log("Restarting...");
      init();
    }

    if (validation) {
      console.log("FINISHED SUCCESSFULLY");
    }
  }
}
