export type DifficultyId = "easy" | "medium" | "hard";

export interface Difficulty {
  id: DifficultyId;
  label: string;
  rows: number;
  cols: number;
  mines: number;
}

export type GameStatus = "idle" | "ready" | "running" | "won" | "lost";

export interface Coordinates {
  row: number;
  col: number;
}

export interface CellState extends Coordinates {
  hasMine: boolean;
  adjacentMines: number;
  revealed: boolean;
  flagged: boolean;
}

export type BoardState = CellState[][];

export interface ResultEntry {
  id: string;
  difficultyId: DifficultyId;
  outcome: "win" | "loss";
  duration: number;
  finishedAt: number;
}
