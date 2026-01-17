import {useAppDispatch} from "../../hooks/useAppDispatch"
import {useAppSelector} from "../../hooks/useAppSelector"
import {startGame} from "../../store/gameSlice"
import {StatsDisplay} from "../dumb/StatsDisplay"
import {Panel} from "../dumb/Panel"

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
