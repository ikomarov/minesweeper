import {DIFFICULTY_MAP} from "../../constants/difficulties"
import {useAppSelector} from "../../hooks/useAppSelector"
import {Panel} from "../dumb/Panel"
import type {ResultViewModel} from "../dumb/ResultsList"
import {ResultsList} from "../dumb/ResultsList"

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
