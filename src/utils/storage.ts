import type {DifficultyId, ResultEntry} from "../types/game"

const RESULTS_KEY = "minesweeper_results"
const DIFFICULTY_KEY = "minesweeper_difficulty"

const isBrowser = () => typeof window !== "undefined"

export const loadResults = (): ResultEntry[] => {
  if (!isBrowser()) {
    return []
  }
  try {
    const raw = window.localStorage.getItem(RESULTS_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as ResultEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveResults = (results: ResultEntry[]) => {
  if (!isBrowser()) {
    return
  }
  try {
    window.localStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  } catch {
    //
  }
}

export const loadDifficulty = (): DifficultyId | null => {
  if (!isBrowser()) {
    return null
  }
  try {
    const value = window.localStorage.getItem(DIFFICULTY_KEY)
    return value ? (value as DifficultyId) : null
  } catch {
    return null
  }
}

export const saveDifficulty = (difficultyId: DifficultyId) => {
  if (!isBrowser()) {
    return
  }
  try {
    window.localStorage.setItem(DIFFICULTY_KEY, difficultyId)
  } catch {
    //
  }
}
