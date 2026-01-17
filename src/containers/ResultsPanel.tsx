import {DIFFICULTY_MAP} from "../constants/difficulties.ts"
import {useAppSelector} from "../hooks/useAppSelector.ts"
import {Panel} from "../components/Panel.tsx"
import type {ResultViewModel} from "../components/ResultsList.tsx"
import {ResultsList} from "../components/ResultsList.tsx"

export const ResultsPanel = () => {
  const results = useAppSelector((state) => state.game.results)
  const mapped: ResultViewModel[] = results.map((result) => ({
    id: result.id,
    label: DIFFICULTY_MAP[result.difficultyId]?.label ?? result.difficultyId,
    outcome: result.outcome,
    duration: result.duration,
    finishedAt: result.finishedAt
  }))

  return (
    <Panel title="Recent games">
      <ResultsList results={mapped} />
    </Panel>
  )
}
