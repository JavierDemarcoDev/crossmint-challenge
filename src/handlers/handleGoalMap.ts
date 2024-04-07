import EventEmitter from "events";
import { timeOut } from "../helpers";
import { AstralBodyMethods } from "../services/ServiceBase";
import { Astral, CurrentMap, GoalMap } from "../types";
import AstralUoW from "../services/AstralUoW";

export async function handleGoalMap(
  event: EventEmitter,
  resetFunction: Function
) {
  const astralUoW = new AstralUoW();

  // Waiting just to avoid too many request
  await timeOut(1000);

  const goalMap = await astralUoW.goalMapRequest(AstralBodyMethods.GET_GOAL);

  const currentMap = await astralUoW.goalMapRequest(
    AstralBodyMethods.GET_CURRENT
  );

  // CurrentMap should have not any error to continue
  // If that is the case then restart the program
  if (currentMap === undefined || goalMap === undefined) {
    resetFunction();
    return;
  }

  const astrals: Astral[] = astralUoW.astralService.getBackAstrals(
    goalMap as GoalMap,
    currentMap as CurrentMap
  );

  astralUoW.createAstralsToGoalMap(astrals, event);
}
