// src/sections/Header.tsx
import {
  GambaUi,
  TokenValue,
  useCurrentPool,
  useGambaPlatformContext,
  useUserBalance,
} from "gamba-react-ui-v2";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "../components/Modal";
import LeaderboardsModal from "../sections/LeaderBoard/LeaderboardsModal";
import { PLATFORM_JACKPOT_FEE, PLATFORM_CREATOR_ADDRESS } from "../constants";
import { useMediaQuery } from "../hooks/useMediaQuery";
import TokenSelect from "./TokenSelect";
import { UserButton } from "./UserButton";
import { ENABLE_LEADERBOARD } from "../constants";

const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #000000ff;
  background: rgba(255, 217, 0, 0.33);
  border-radius: 10px;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: white;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: #00000017;
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled(NavLink)`
  height: 35px;
  margin: 0 15px;
  & > img {
    height: 120%;
  }
`;

const MobileMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MobileMenuButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  background: rgba(255, 217, 0, 0.1);
  color: #000000ff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MobileMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(163, 92, 0, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 200px;
  z-index: 1001;
  margin-top: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  a {
    color: #ffffff;
    text-decoration: none;
    padding: 8px 0;
    font-weight: normal;
    transition: color 0.2s;

    &:hover {
      color: #ff9800;
    }
  }
`;

export default function Header() {
  const pool = useCurrentPool();
  const context = useGambaPlatformContext();
  const balance = useUserBalance();
  const isDesktop = useMediaQuery("lg");
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);
  const [bonusHelp, setBonusHelp] = React.useState(false);
  const [jackpotHelp, setJackpotHelp] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false); // Add this state

  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>Bonus ✨</h1>
          <p>
            You have{" "}
            <b>
              <TokenValue amount={balance.bonusBalance} />
            </b>{" "}
            worth of free plays. This bonus will be applied automatically when
            you play.
          </p>
          <p>Note that a fee is still needed from your wallet for each play.</p>
        </Modal>
      )}

      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <h1>Jackpot 💰</h1>
          <p style={{ fontWeight: "bold" }}>
            There&apos;s <TokenValue amount={pool.jackpotBalance} /> in the
            Jackpot.
          </p>
          <p>
            The Jackpot is a prize pool that grows with every bet made. As it
            grows, so does your chance of winning. Once a winner is selected,
            the pool resets and grows again from there.
          </p>
          <p>
            You pay a maximum of{" "}
            {(PLATFORM_JACKPOT_FEE * 100).toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}
            % of each wager for a chance to win.
          </p>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {context.defaultJackpotFee === 0 ? "DISABLED" : "ENABLED"}
            <GambaUi.Switch
              checked={context.defaultJackpotFee > 0}
              onChange={(checked) =>
                context.setDefaultJackpotFee(checked ? PLATFORM_JACKPOT_FEE : 0)
              }
            />
          </label>
        </Modal>
      )}

      {ENABLE_LEADERBOARD && showLeaderboard && (
        <LeaderboardsModal
          creator={PLATFORM_CREATOR_ADDRESS.toBase58()}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      <StyledHeader>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Logo to="/">
            <img alt="Bonkbet logo" src="/logo.png" />
          </Logo>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Desktop Navigation */}
          {isDesktop ? (
            <>
              <nav>
                <a
                  href="https://bonkbet.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#000000ff",
                    fontWeight: "bold",
                    textDecoration: "none",
                    marginRight: "20px",
                    fontSize: "16px",
                    transition: "color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ff9800")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#000000ff")
                  }
                >
                  Home
                </a>
              </nav>
              {pool.jackpotBalance > 0 && (
                <Bonus onClick={() => setJackpotHelp(true)}>
                  💰 <TokenValue amount={pool.jackpotBalance} />
                </Bonus>
              )}
              {balance.bonusBalance > 0 && (
                <Bonus onClick={() => setBonusHelp(true)}>
                  ✨ <TokenValue amount={balance.bonusBalance} />
                </Bonus>
              )}
              <GambaUi.Button onClick={() => setShowLeaderboard(true)}>
                Leaderboard
              </GambaUi.Button>
              <TokenSelect />
              <UserButton />
            </>
          ) : (
            // Mobile Navigation
            <MobileMenu>
              <TokenSelect />
              <MobileMenuButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span>☰</span>
              </MobileMenuButton>
              {mobileMenuOpen && (
                
                <MobileMenuDropdown>
                  <a
                    href="https://bonkbet.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                  ----------------
                  {pool.jackpotBalance > 0 && (
                    <Bonus
                      onClick={() => {
                        setJackpotHelp(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      💰 <TokenValue amount={pool.jackpotBalance} />
                    </Bonus>
                  )}
                  {balance.bonusBalance > 0 && (
                    <Bonus
                      onClick={() => {
                        setBonusHelp(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      ✨ <TokenValue amount={balance.bonusBalance} />
                    </Bonus>
                  )}
                  <GambaUi.Button
                    onClick={() => {
                      setShowLeaderboard(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Leaderboard
                  </GambaUi.Button>
                  <TokenSelect />
                  <UserButton />
                </MobileMenuDropdown>
              )}
            </MobileMenu>
          )}
        </div>
      </StyledHeader>
    </>
  );
}
