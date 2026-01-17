import styled, {createGlobalStyle} from "styled-components"
import {GameContainer} from "./containers/GameContainer.tsx"

export const App = () => (
  <>
    <GlobalStyle />
    <AppWrapper>
      <Heading>Minesweeper</Heading>
      <GameContainer />
    </AppWrapper>
  </>
)

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background: radial-gradient(circle at top, #1e2a44, #050810);
    min-height: 100vh;
    color: #f8fbff;
  }
`

const AppWrapper = styled.main`
  min-height: 100vh;
  padding: 40px 16px 60px;
`

const Heading = styled.h1`
  text-align: center;
  font-size: 2.4rem;
  margin: 0;
  margin-bottom: 24px;
  letter-spacing: 1px;
  color: #f5f7ff;
`
