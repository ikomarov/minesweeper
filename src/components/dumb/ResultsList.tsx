import styled from "styled-components"

export interface ResultViewModel {
  id: string;
  label: string;
  outcome: "win" | "loss";
  duration: number;
  finishedAt: number;
}

interface ResultsListProps {
  results: ResultViewModel[];
}

const formatDuration = (value: number) => {
  const totalSeconds = Math.max(0, Math.floor(value / 1000))
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (totalSeconds % 60).toString().padStart(2, "0")
  return `${minutes}:${seconds}`
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

export const ResultsList = ({results}: ResultsListProps) => (
  <ResultsWrapper>
    {results.length === 0 && <EmptyState>No finished games</EmptyState>}
    {results.map((result) => (
      <ResultRow key={result.id} $outcome={result.outcome}>
        <div>
          <strong>{result.label}</strong>
          <span>{formatDate(result.finishedAt)}</span>
        </div>
        <div>
          <Outcome>{result.outcome === "win" ? "Win" : "Loss"}</Outcome>
          <Duration>{formatDuration(result.duration)}</Duration>
        </div>
      </ResultRow>
    ))}
  </ResultsWrapper>
)

const ResultsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const EmptyState = styled.p`
    color: #7f8aad;
    margin: 0;
`

const ResultRow = styled.div<{$outcome: "win" | "loss"}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 12px;
    background: ${({$outcome}) => ($outcome === "win" ? "rgba(34, 93, 62, 0.5)" : "rgba(99, 43, 43, 0.5)")};
    color: #e6ecff;
    gap: 12px;

    div {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    span {
        font-size: 0.75rem;
        color: #9fb4d7;
    }
`

const Outcome = styled.span`
    font-weight: 600;
    font-size: 0.9rem;
    color: #f6f6f6;
`

const Duration = styled.span`
    font-size: 0.85rem;
    color: #c8d9ff;
`
