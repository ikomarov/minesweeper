import styled from "styled-components"
import type {ReactNode} from "react"

interface PanelProps {
  title: string;
  children: ReactNode;
  compact?: boolean;
}

export const Panel = ({title, children, compact}: PanelProps) => (
  <PanelWrapper $compact={compact}>
    <PanelTitle>{title}</PanelTitle>
    <PanelBody>{children}</PanelBody>
  </PanelWrapper>
)

const PanelWrapper = styled.section<{$compact?: boolean}>`
  background: rgba(10, 14, 24, 0.9);
  border-radius: 16px;
  padding: ${({$compact}) => ($compact ? "16px" : "20px 24px")};
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: fit-content;
`

const PanelTitle = styled.h2`
  color: #d2dcff;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
`

const PanelBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
