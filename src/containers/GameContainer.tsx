import styled from "styled-components"
import {DifficultySelector} from "./DifficultySelector.tsx"
import {GameStats} from "./GameStats.tsx"
import {GameBoard} from "./GameBoard.tsx"
import {ResultsPanel} from "./ResultsPanel.tsx"
import {useGameTimer} from "../hooks/useGameTimer.ts"

export const GameContainer = () => {
  useGameTimer()

  return (
    <Wrapper>
      <Sidebar>
        <DifficultySelector />
        <ResultsPanel />
      </Sidebar>
      <Main>
        <GameStats />
        <GameBoard />
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 24px;
    grid-template-columns: 320px 1fr;
    padding: 24px;
    box-sizing: border-box;
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`
