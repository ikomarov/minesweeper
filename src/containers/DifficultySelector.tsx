import {DIFFICULTIES} from "../constants/difficulties.ts"
import {startGame} from "../store/gameSlice.ts"
import type {DifficultyId} from "../types/game.ts"
import {useAppDispatch} from "../hooks/useAppDispatch.ts"
import {useAppSelector} from "../hooks/useAppSelector.ts"
import {Panel} from "../components/Panel.tsx"
import {DifficultyOptions} from "../components/DifficultyOptions.tsx"

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
