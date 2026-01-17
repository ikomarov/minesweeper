import {DIFFICULTIES} from "../../constants/difficulties"
import {startGame} from "../../store/gameSlice"
import type {DifficultyId} from "../../types/game"
import {useAppDispatch} from "../../hooks/useAppDispatch"
import {useAppSelector} from "../../hooks/useAppSelector"
import {Panel} from "../dumb/Panel"
import {DifficultyOptions} from "../dumb/DifficultyOptions"

export const DifficultySelector = () => {
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector((state) => state.game.difficultyId)

  const handleSelect = (difficultyId: string) => {
    dispatch(startGame(difficultyId as DifficultyId))
  }

  return (
    <Panel title="Difficulty">
      <DifficultyOptions options={DIFFICULTIES} selectedId={selectedId} onSelect={handleSelect} />
    </Panel>
  )
}
