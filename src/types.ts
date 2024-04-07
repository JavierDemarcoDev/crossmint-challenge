export interface CurrentMap {
  content: (null | { type: CurrentAstralBody })[][];
}

export interface GoalMap {
  goal: AstralBodies[][];
}

export interface Astral {
  row: number;
  column: number;
  type?: AstralBodies | string;
  color?: Colors;
  direction?: Directions;
}

export enum CurrentAstralBody {
  POLYANET,
  SOLOON,
  COMETH,
}

export enum AstralBodies {
  SPACE = "SPACE",
  POLYANET = "POLYANET",
  SOLOON = "SOLOON",
  COMETH = "COMETH",
}

export enum Colors {
  BLUE = "blue",
  RED = "red",
  PURPLE = "purple",
  WHITE = "white",
}

export enum Directions {
  UP = "up",
  DOWN = "down",
  RIGHT = "right",
  LEFT = "left",
}

export interface Coords {
  row: number;
  column: number;
}
