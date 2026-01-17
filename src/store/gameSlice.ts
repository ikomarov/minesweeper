import type {PayloadAction} from "@reduxjs/toolkit"
import {createSlice} from "@reduxjs/toolkit"
import {DEFAULT_DIFFICULTY_ID, DIFFICULTIES, DIFFICULTY_MAP} from "../constants/difficulties"
import {createEmptyBoard, generateBoard, revealArea, revealMines} from "../utils/board"
import {loadDifficulty, loadResults, saveDifficulty, saveResults} from "../utils/storage"
import type {BoardState, Coordinates, Difficulty, DifficultyId, GameStatus, ResultEntry} from "../types/game"

interface GameSliceState {
  board: BoardState;
  difficultyId: DifficultyId;
  config: Difficulty;
  status: GameStatus;
  boardReady: boolean;
  flagsLeft: number;
  safeCellsToReveal: number;
  revealedSafeCells: number;
  startTime: number | null;
  elapsed: number;
  results: ResultEntry[];
}

const MAX_RESULTS = 8

const persistedDifficulty = loadDifficulty()
const defaultDifficulty =
  DIFFICULTY_MAP[persistedDifficulty ?? DEFAULT_DIFFICULTY_ID] ?? DIFFICULTIES[0]

const baseState = (difficulty: Difficulty): Omit<GameSliceState, "results"> => ({
  board: createEmptyBoard(difficulty.rows, difficulty.cols),
  difficultyId: difficulty.id,
  config: difficulty,
  status: "ready",
  boardReady: false,
  flagsLeft: difficulty.mines,
  safeCellsToReveal: difficulty.rows * difficulty.cols - difficulty.mines,
  revealedSafeCells: 0,
  startTime: null,
  elapsed: 0
})

const initialState: GameSliceState = {
  ...baseState(defaultDifficulty),
  results: loadResults()
}

const applyDifficulty = (state: GameSliceState, difficulty: Difficulty) => {
  const nextDifficulty = DIFFICULTY_MAP[difficulty.id] ?? state.config
  const reset = baseState(nextDifficulty)
  state.board = reset.board
  state.difficultyId = reset.difficultyId
  state.config = reset.config
  state.status = reset.status
  state.boardReady = reset.boardReady
  state.flagsLeft = reset.flagsLeft
  state.safeCellsToReveal = reset.safeCellsToReveal
  state.revealedSafeCells = reset.revealedSafeCells
  state.startTime = reset.startTime
  state.elapsed = reset.elapsed
}

const finishGame = (state: GameSliceState, outcome: ResultEntry["outcome"]) => {
  const endedAt = Date.now()
  if (state.startTime) {
    state.elapsed = endedAt - state.startTime
  }
  const entry: ResultEntry = {
    id: `${endedAt}`,
    difficultyId: state.difficultyId,
    outcome,
    duration: state.elapsed,
    finishedAt: endedAt
  }
  state.results = [entry, ...state.results].slice(0, MAX_RESULTS)
  state.startTime = null
  saveResults(state.results)
}

const getElapsed = (state: GameSliceState) => {
  if (!state.startTime) {
    return state.elapsed
  }
  return Date.now() - state.startTime
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<DifficultyId | undefined>) {
      const requested = action.payload ?? state.difficultyId
      const nextDifficulty = DIFFICULTY_MAP[requested] ?? state.config
      applyDifficulty(state, nextDifficulty)
      saveDifficulty(nextDifficulty.id)
    },
    revealCell(state, action: PayloadAction<Coordinates>) {
      if (state.status === "won" || state.status === "lost") {
        return
      }
      const {row, col} = action.payload
      const rows = state.board.length
      const cols = state.board[0]?.length ?? 0
      if (row < 0 || row >= rows || col < 0 || col >= cols) {
        return
      }
      if (!state.boardReady) {
        state.board = generateBoard(
          state.config.rows,
          state.config.cols,
          state.config.mines,
          action.payload
        )
        state.boardReady = true
      }
      const cell = state.board[row][col]
      if (cell.revealed || cell.flagged) {
        return
      }
      if (!state.startTime) {
        state.startTime = Date.now()
        state.status = "running"
      }
      if (cell.hasMine) {
        cell.revealed = true
        state.status = "lost"
        revealMines(state.board)
        finishGame(state, "loss")
        return
      }
      const opened = revealArea(state.board, action.payload)
      if (opened > 0) {
        state.revealedSafeCells += opened
      }
      if (state.revealedSafeCells >= state.safeCellsToReveal) {
        state.status = "won"
        state.elapsed = getElapsed(state)
        revealMines(state.board)
        finishGame(state, "win")
        return
      }
      if (state.status === "ready") {
        state.status = "running"
      }
    },
    toggleFlag(state, action: PayloadAction<Coordinates>) {
      if (state.status === "won" || state.status === "lost") {
        return
      }
      const {row, col} = action.payload
      const rows = state.board.length
      const cols = state.board[0]?.length ?? 0
      if (row < 0 || row >= rows || col < 0 || col >= cols) {
        return
      }
      const cell = state.board[row][col]
      if (cell.revealed) {
        return
      }
      if (cell.flagged) {
        cell.flagged = false
        state.flagsLeft += 1
        return
      }
      if (state.flagsLeft <= 0) {
        return
      }
      cell.flagged = true
      state.flagsLeft -= 1
    },
    tick(state) {
      if (state.status !== "running" || !state.startTime) {
        return
      }
      state.elapsed = Date.now() - state.startTime
    },
    hydrateResults(state) {
      state.results = loadResults()
    }
  }
})

export const {startGame, revealCell, toggleFlag, tick, hydrateResults} = gameSlice.actions
