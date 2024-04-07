import EventEmitter from "events";
import { timeOut } from "../helpers";
import AstralUoW from "../services/AstralUoW";
import { AstralBodyMethods } from "../services/ServiceBase";

export async function handleChallengeValidation(
  event: EventEmitter,
  init: Function
) {
  event.on("finish", async () => {
    const astralUoW = new AstralUoW();

    await timeOut(1000);

    await astralUoW.goalMapRequest(AstralBodyMethods.CHECK, event, init);
    return event;
  });
}
