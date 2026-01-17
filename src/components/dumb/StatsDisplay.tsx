import styled from "styled-components"
import type {GameStatus} from "../../types/game"

interface StatsDisplayProps {
  elapsed: number;
  flagsLeft: number;
  status: GameStatus;
  difficultyLabel: string;
  onRestart: () => void;
}

const formatElapsed = (value: number) => {
  const totalSeconds = Math.max(0, Math.floor(value / 1000))
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (totalSeconds % 60).toString().padStart(2, "0")
  return `${minutes}:${seconds}`
}

const statusText: Record<GameStatus, string> = {
  idle: "Waiting",
  ready: "Ready",
  running: "Playing",
  won: "Won",
  lost: "Lost"
}

export const StatsDisplay = ({
                               elapsed,
                               flagsLeft,
                               status,
                               difficultyLabel,
                               onRestart
                             }: StatsDisplayProps) => (
  <StatsWrapper>
    <InfoBlock>
      <small>Time</small>
      <strong>{formatElapsed(elapsed)}</strong>
    </InfoBlock>
    <InfoBlock>
      <small>Flags</small>
      <strong>{flagsLeft}</strong>
    </InfoBlock>
    <InfoBlock>
      <small>Status</small>
      <strong>{statusText[status]}</strong>
    </InfoBlock>
    <InfoBlock>
      <small>Difficulty</small>
      <strong>{difficultyLabel}</strong>
    </InfoBlock>
    <RestartButton type="button" onClick={onRestart}>
      Restart
    </RestartButton>
  </StatsWrapper>
)

const StatsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    align-items: stretch;
`

const InfoBlock = styled.div`
    background: rgba(23, 34, 56, 0.8);
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 4px;

    small {
        font-size: 0.75rem;
        color: #9ab1d8;
    }

    strong {
        font-size: 1rem;
        color: #f3f6ff;
    }
`

const RestartButton = styled.button`
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #5161ff, #5bd0ff);
    color: #0a0e18;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: transform 0.12s ease, box-shadow 0.2s ease;
    padding: 0 16px;
    min-height: 60px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(67, 108, 255, 0.4);
    }
`
