import styled from "styled-components"
import type {BoardState, Coordinates, GameStatus} from "../../types/game"
import {Cell} from "./Cell"

interface BoardProps {
  board: BoardState;
  status: GameStatus;
  onRevealCell: (coords: Coordinates) => void;
  onFlagCell: (coords: Coordinates) => void;
}

export const Board = ({board, status, onRevealCell, onFlagCell}: BoardProps) => {
  const cols = board[0]?.length ?? 0
  return (
    <BoardWrapper>
      <Grid $cols={cols}>
        {board.map((row) =>
          row.map((cell) => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              status={status}
              onReveal={() => onRevealCell({row: cell.row, col: cell.col})}
              onFlag={() => onFlagCell({row: cell.row, col: cell.col})}
            />
          ))
        )}
      </Grid>
    </BoardWrapper>
  )
}

const BoardWrapper = styled.div`
    background: rgba(10, 14, 24, 0.85);
    padding: 20px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
`

const Grid = styled.div<{$cols: number}>`
    display: grid;
    grid-template-columns: repeat(${({$cols}) => $cols}, 40px);
    justify-content: center;
    gap: 4px;
`
