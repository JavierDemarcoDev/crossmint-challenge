import dotenv from "dotenv";
import EventEmitter from "events";
import { handleChallengeValidation, handleGoalMap } from "./handlers";

dotenv.config();

let programStarts = false;

(async function init() {
  const event: EventEmitter = new EventEmitter();

  if (!programStarts) console.log("STARTING PROGRAM");

  // Checking after running first the handle goalMap creator
  event.on("finish", async () => {
    if (programStarts) await handleChallengeValidation(event, init);

    return;
  });

  programStarts = true;

  await handleGoalMap(event, init);
})();
