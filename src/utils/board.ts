import type {BoardState, CellState, Coordinates} from "../types/game"

const neighborOffsets = [
  {row: -1, col: -1},
  {row: -1, col: 0},
  {row: -1, col: 1},
  {row: 0, col: -1},
  {row: 0, col: 1},
  {row: 1, col: -1},
  {row: 1, col: 0},
  {row: 1, col: 1}
]

const inBounds = (rows: number, cols: number, row: number, col: number) =>
  row >= 0 && row < rows && col >= 0 && col < cols

export const createEmptyBoard = (rows: number, cols: number): BoardState =>
  Array.from({length: rows}, (_, row) =>
    Array.from({length: cols}, (_, col): CellState => ({
      row,
      col,
      hasMine: false,
      adjacentMines: 0,
      flagged: false,
      revealed: false
    }))
  )

const shuffle = (list: number[]) => {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const generateBoard = (
  rows: number,
  cols: number,
  mines: number,
  safeSpot?: Coordinates
): BoardState => {
  const board = createEmptyBoard(rows, cols)
  const totalCells = rows * cols
  const availablePositions = shuffle(
    Array.from({length: totalCells}, (_, index) => index).filter((index) => {
      if (!safeSpot) {
        return true
      }
      const row = Math.floor(index / cols)
      const col = index % cols
      return !(row === safeSpot.row && col === safeSpot.col)
    })
  )

  let planted = 0
  while (planted < mines && availablePositions.length) {
    const spot = availablePositions.pop()
    if (spot === undefined) {
      break
    }
    const row = Math.floor(spot / cols)
    const col = spot % cols
    const cell = board[row][col]
    if (cell.hasMine) {
      continue
    }
    cell.hasMine = true
    neighborOffsets.forEach((offset) => {
      const nRow = row + offset.row
      const nCol = col + offset.col
      if (inBounds(rows, cols, nRow, nCol)) {
        board[nRow][nCol].adjacentMines += 1
      }
    })
    planted += 1
  }

  return board
}

export const revealArea = (board: BoardState, source: Coordinates) => {
  const rows = board.length
  const cols = board[0]?.length ?? 0
  const queue: Coordinates[] = [source]
  const visited = new Set<string>()
  let opened = 0

  while (queue.length) {
    const point = queue.shift()
    if (!point) {
      continue
    }
    const {row, col} = point
    if (!inBounds(rows, cols, row, col)) {
      continue
    }
    const cell = board[row][col]
    if (cell.revealed || cell.flagged) {
      continue
    }
    cell.revealed = true
    opened += 1
    if (cell.hasMine || cell.adjacentMines > 0) {
      continue
    }
    neighborOffsets.forEach((offset) => {
      const nRow = row + offset.row
      const nCol = col + offset.col
      if (!inBounds(rows, cols, nRow, nCol)) {
        return
      }
      const key = `${nRow}-${nCol}`
      if (visited.has(key)) {
        return
      }
      visited.add(key)
      queue.push({row: nRow, col: nCol})
    })
  }

  return opened
}

export const revealMines = (board: BoardState) => {
  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell.hasMine) {
        cell.revealed = true
      }
    })
  )
}
