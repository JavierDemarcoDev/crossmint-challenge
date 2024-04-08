import dotenv from "dotenv";
import EventEmitter from "events";
import { handleChallengeValidation, handleGoalMap } from "./handlers";

dotenv.config();

let programStarts = false;

(async function init() {
  const event: EventEmitter = new EventEmitter();

  // Checking after running first the handle goalMap creator
  event.on("finish", async () => {
    if (programStarts) {
      await handleChallengeValidation(event, init);
    } else console.log("STARTING PROGRAM");

    return;
  });

  programStarts = true;

  await handleGoalMap(event, init);
})();
