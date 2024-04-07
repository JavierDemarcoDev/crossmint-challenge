import {
  Astral,
  AstralBodies,
  Colors,
  CurrentMap,
  Directions,
  GoalMap,
} from "../../types";
import ServiceBase from "../ServiceBase";

const parsePropList = (type: AstralBodies) => type?.split("_")[0].toLowerCase();

export class AstralService extends ServiceBase {
  getDirection(stringType: string): Directions | undefined {
    const type = this.getType(stringType);

    if (type === AstralBodies.COMETH) {
      return parsePropList(type) as Directions;
    }

    return undefined;
  }

  getColor(stringType: string): Colors | undefined {
    const type = this.getType(stringType);

    if (type == AstralBodies.SOLOON) {
      return parsePropList(type) as Colors;
    }

    return undefined;
  }

  getType(type: string | undefined): AstralBodies {
    if (type === AstralBodies.SPACE || type === AstralBodies.POLYANET) {
      return type;
    }

    if (type?.includes(AstralBodies.SOLOON)) {
      return AstralBodies.SOLOON;
    }

    if (type?.includes(AstralBodies.COMETH)) {
      return AstralBodies.COMETH;
    }

    return AstralBodies.SPACE;
  }

  getBackAstrals(goalMap: GoalMap, currentMap: CurrentMap): Astral[] {
    const astrals: Astral[] = [];
    const goal = goalMap.goal;
    const current = currentMap?.content;

    //Mapping goals matrix
    for (let i = 0; i < goal.length; i++) {
      for (let j = 0; j < goal[i].length; j++) {
        //Goal not empty cell & Current empty cell
        if (
          goal[i][j] !== AstralBodies.SPACE &&
          current?.[i][j]?.type === null
        ) {
          astrals.push({
            type: goal[i][j],
            row: i,
            column: j,
          });
        }
      }
    }
    return astrals;
  }
}
