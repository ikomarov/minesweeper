import type {Difficulty} from "../types/game"

export const DIFFICULTIES: Difficulty[] = [
  {id: "easy", label: "Easy", rows: 8, cols: 8, mines: 10},
  {id: "medium", label: "Medium", rows: 12, cols: 12, mines: 24},
  {id: "hard", label: "Hard", rows: 16, cols: 16, mines: 48}
]

export const DEFAULT_DIFFICULTY_ID = DIFFICULTIES[0].id

export const DIFFICULTY_MAP = DIFFICULTIES.reduce<Record<string, Difficulty>>((acc, difficulty) => {
  acc[difficulty.id] = difficulty
  return acc
}, {})
