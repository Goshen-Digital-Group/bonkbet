import React from "react";
import styled from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useUserStore } from "../../hooks/useUserStore";

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Buttons = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (min-width: 800px) {
    height: 100%;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-top: 0 !important;
  }

  & > button {
    border: none;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    background: #f0dfbadf;
    transition: background-color 0.2s ease;
    color: black;
    cursor: pointer;
    &:hover {
      background: white;
    }
  }
`;

export function Navigation() {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const store = useUserStore();
  const copyInvite = () => {
    store.set({ userModal: true });
    if (!wallet.connected) {
      walletModal.setVisible(true);
    }
  };

  return (
    <MenuContainer>
      <Buttons>
        <button onClick={copyInvite}>💸 Invite Now</button>
        <button onClick={() => window.open("https://x.com/BonkBetSolana", "_blank")}>
          𝕏 X
        </button>
        <button
          onClick={() => window.open("https://x.com/i/communities/1949296345229181382", "_blank")}
        >
          𝕏 Community
        </button>
        <button
          onClick={() => window.open("https://docs.bonkbet.live", "_blank")}
        >
          📖 Docs
        </button>
        <button
          onClick={() => window.open("https://letsbonk.fun/", "_blank")}
        >
          💰 Buy Now
        </button>
      </Buttons>
    </MenuContainer>
  );
}
