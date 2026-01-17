import styled from "styled-components"
import type {Difficulty} from "../types/game.ts"

interface DifficultyOptionsProps {
  options: Difficulty[];
  selectedId: string;
  onSelect: (difficultyId: string) => void;
}

export const DifficultyOptions = ({options, selectedId, onSelect}: DifficultyOptionsProps) => (
  <OptionsList>
    {options.map((option) => (
      <OptionButton
        key={option.id}
        type="button"
        onClick={() => onSelect(option.id)}
        $active={option.id === selectedId}
      >
        <strong>{option.label}</strong>
        <span>
          {option.rows}x{option.cols}, {option.mines} mines
        </span>
      </OptionButton>
    ))}
  </OptionsList>
)

const OptionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`

const OptionButton = styled.button<{$active: boolean}>`
  border: none;
  padding: 14px 16px;
  border-radius: 12px;
  background: ${({$active}) => ($active ? "#2e4d7b" : "#141e2f")};
  color: ${({$active}) => ($active ? "#f6f8ff" : "#c7d5f4")};
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  box-shadow: ${({$active}) =>
  $active ? "0 12px 25px rgba(42, 89, 167, 0.4)" : "0 6px 16px rgba(0, 0, 0, 0.4)"};
  &:hover {
    transform: translateY(-2px);
    background: ${({$active}) => ($active ? "#34588c" : "#1a2a43")};
  }
  strong {
    font-size: 0.95rem;
  }
  span {
    font-size: 0.8rem;
    color: #92a7d6;
  }
`
