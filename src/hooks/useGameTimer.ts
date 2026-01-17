import {useEffect} from "react"
import {useAppDispatch} from "./useAppDispatch"
import {useAppSelector} from "./useAppSelector"
import {tick} from "../store/gameSlice"

export const useGameTimer = () => {
  const status = useAppSelector((state) => state.game.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status !== "running") {
      return
    }
    const timerId = window.setInterval(() => {
      dispatch(tick())
    }, 200)
    return () => {
      window.clearInterval(timerId)
    }
  }, [status, dispatch])
}
