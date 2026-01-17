import {useAppDispatch} from "../hooks/useAppDispatch.ts"
import {useAppSelector} from "../hooks/useAppSelector.ts"
import {startGame} from "../store/gameSlice.ts"
import {StatsDisplay} from "../components/StatsDisplay.tsx"
import {Panel} from "../components/Panel.tsx"

export const GameStats = () => {
  const dispatch = useAppDispatch()
  const {elapsed, flagsLeft, status, config} = useAppSelector((state) => state.game)

  const handleRestart = () => {
    dispatch(startGame(undefined))
  }

  return (
    <Panel title="Status" compact>
      <StatsDisplay
        elapsed={elapsed}
        flagsLeft={flagsLeft}
        status={status}
        difficultyLabel={config.label}
        onRestart={handleRestart}
      />
    </Panel>
  )
}
