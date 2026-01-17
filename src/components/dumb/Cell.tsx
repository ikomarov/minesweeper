import styled from "styled-components"
import type {CellState, GameStatus} from "../../types/game"

interface CellProps {
  cell: CellState;
  status: GameStatus;
  onReveal: () => void;
  onFlag: () => void;
}

const getCellLabel = (cell: CellState) => {
  if (cell.revealed) {
    if (cell.hasMine) {
      return "*"
    }
    return cell.adjacentMines === 0 ? "" : String(cell.adjacentMines)
  }
  if (cell.flagged) {
    return "F"
  }
  return ""
}

const getCellTone = (cell: CellState) => {
  if (cell.revealed) {
    if (cell.hasMine) {
      return "#8b0000"
    }
    if (cell.adjacentMines === 0) {
      return "#1d2735"
    }
    return "#233245"
  }
  return "#0f1724"
}

export const Cell = ({cell, onReveal, onFlag, status}: CellProps) => {
  const disabled = status === "won" || status === "lost"
  return (
    <CellButton
      type="button"
      onClick={onReveal}
      onContextMenu={(event) => {
        event.preventDefault()
        onFlag()
      }}
      disabled={disabled && !cell.revealed}
      $tone={getCellTone(cell)}
      $revealed={cell.revealed}
    >
      <CellLabel $revealed={cell.revealed}>{getCellLabel(cell)}</CellLabel>
    </CellButton>
  )
}

const CellButton = styled.button<{$tone: string; $revealed: boolean}>`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: ${({$tone}) => $tone};
  color: ${({$revealed}) => ($revealed ? "#f5f5f5" : "#9fb4d7")};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.08s ease-out, background 0.2s ease;
  box-shadow: ${({$revealed}) =>
  $revealed ? "inset 0 0 6px rgba(0, 0, 0, 0.4)" : "0 4px 8px rgba(0, 0, 0, 0.3)"};
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    cursor: default;
    opacity: 0.8;
  }
`

const CellLabel = styled.span<{$revealed: boolean}>`
  font-size: ${({$revealed}) => ($revealed ? "1.1rem" : "0.95rem")};
  letter-spacing: 1px;
`
