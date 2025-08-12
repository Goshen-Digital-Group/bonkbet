import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Copy } from "lucide-react"; // npm install lucide-react

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-10px);}
  10% { opacity: 1; transform: translateY(0);}
  90% { opacity: 1; transform: translateY(0);}
  100% { opacity: 0; transform: translateY(-10px);}
`;

const Wrapper = styled.div`
  margin-top: 0.1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.p`
  font-size: clamp(1rem, 2vw, 1rem);
  font-weight: bold;
  margin-bottom: 0.75rem;
  letter-spacing: 0.08em;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5em 1.5em;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) inset;
  backdrop-filter: blur(4px);
  display: inline-block;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  background: #78350f;
  font-family: monospace;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 999px;
  width: 100%;
  max-width: 24em;
  margin: 0 auto;
  box-sizing: border-box;

  @media (min-width: 600px) {
    flex-direction: row;
    gap: 1em;
    padding: 0.75em 1.5em;
  }
`;

const AddressText = styled.span`
  flex: 1;
  text-align: center;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  padding: 0 0.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 600px) {
    padding: 0 1em;
  }
`;

const CopyButton = styled.button`
  background: #facc1562;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5em 0.75em;
  cursor: pointer;
  transition: transform 0.15s, background 0.15s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #fde68a;
    color: #78350f;
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-2.5em);
  background: #fa9715ff;
  color: #000000ff;
  font-weight: bold;
  padding: 0.5em 1.2em;
  border-radius: 1em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  font-size: clamp(0.8rem, 2vw, 1.1rem);
  z-index: 50;
  animation: ${fadeInOut} 1.8s ease;
  pointer-events: none;
  white-space: nowrap;
`;

export function ContractAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const truncated = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : "Loading...";

  return (
    <Wrapper>
      <Title>CONTRACT ADDRESS</Title>
      <FlexContainer>
        <AddressText>{truncated}</AddressText>
        <CopyButton onClick={handleCopy} aria-label="Copy contract address">
          <Copy style={{ width: 28, height: 28 }} />
        </CopyButton>
      </FlexContainer>
      {copied && <Tooltip>BONKBET CA COPIED!</Tooltip>}
    </Wrapper>
  );
}