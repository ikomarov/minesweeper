import {Board} from "../components/Board.tsx"
import {Panel} from "../components/Panel.tsx"
import {useAppSelector} from "../hooks/useAppSelector.ts"
import {useAppDispatch} from "../hooks/useAppDispatch.ts"
import {revealCell, toggleFlag} from "../store/gameSlice.ts"
import type {Coordinates} from "../types/game.ts"

export const GameBoard = () => {
  const dispatch = useAppDispatch()
  const {board, status} = useAppSelector((state) => state.game)

  const handleReveal = (coords: Coordinates) => {
    dispatch(revealCell(coords))
  }

  const handleFlag = (coords: Coordinates) => {
    dispatch(toggleFlag(coords))
  }

  return (
    <Panel title="Board">
      <Board board={board} status={status} onRevealCell={handleReveal} onFlagCell={handleFlag} />
    </Panel>
  )
}
