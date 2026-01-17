import {Board} from "../dumb/Board"
import {Panel} from "../dumb/Panel"
import {useAppSelector} from "../../hooks/useAppSelector"
import {useAppDispatch} from "../../hooks/useAppDispatch"
import {revealCell, toggleFlag} from "../../store/gameSlice"
import type {Coordinates} from "../../types/game"

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
