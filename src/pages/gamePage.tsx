import { useReducer, useEffect } from "react";
import PlayerArea from "../components/PlayerArea";
import GameInfo from "../components/GameInfo";
import { generateDeck, shuffleDeck, getCardRank } from "../utils/deckUtils";
import type { GameState } from "../types/game";
import type { Card } from "../types/card";
import type  {PAGE} from "../types/page"
import { sendRequest } from "../utils/api";

interface Props {
  changePage: (page: PAGE) => void;
}

//starting state
const createInitialState = (): GameState => {
  const deck = shuffleDeck(generateDeck());
  return {
    playerDeck: deck.slice(0, 26),
    computerDeck: deck.slice(26),
    playerCard: null,
    computerCard: null,
    roundResult: null,
    roundCount: 0,
    warPile: [],
    phase: "waiting",
    gameOver: false,
    winner: null,
  };
};

//reducer
type Action = { type: "NEW_GAME" } | { type: "FLIP_CARDS" };

function resolveFlip(state: GameState): GameState {
  const { playerDeck, computerDeck, warPile, roundCount } = state;

  if (!playerDeck.length || !computerDeck.length) return state;

  const [playerCard, ...restPlayer] = playerDeck;
  const [computerCard, ...restComputer] = computerDeck;
  const pot: Card[] = [...warPile, playerCard, computerCard];

  const pRank = getCardRank(playerCard);
  const cRank = getCardRank(computerCard);

  let newPlayerDeck: Card[];
  let newComputerDeck: Card[];
  let newWarPile: Card[] = [];

  if (pRank > cRank) {
    // Player wins — they collect the pot
    newPlayerDeck = [...restPlayer, ...shuffleDeck(pot)];
    newComputerDeck = restComputer;
  } else if (cRank > pRank) {
    // Computer wins — it collects the pot
    newPlayerDeck = restPlayer;
    newComputerDeck = [...restComputer, ...shuffleDeck(pot)];
  } else {
    // Tie — pot stays as war pile for the next round
    newPlayerDeck = restPlayer;
    newComputerDeck = restComputer;
    newWarPile = pot;
  }

  const roundResult = pRank > cRank ? "player" : cRank > pRank ? "computer" : "tie";
  const gameOver = newPlayerDeck.length === 0 || newComputerDeck.length === 0;
  const winner = gameOver
    ? newPlayerDeck.length > 0
      ? "player"
      : "computer"
    : null;

  return {
    playerDeck: newPlayerDeck,
    computerDeck: newComputerDeck,
    playerCard,
    computerCard,
    roundResult,
    roundCount: roundCount + 1,
    warPile: newWarPile,
    phase: "revealed",
    gameOver,
    winner,
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "NEW_GAME":
      return createInitialState();
    case "FLIP_CARDS":
      return state.gameOver ? state : resolveFlip(state);
    default:
      return state;
  }
}
const GamePage = (props: Props) =>  {
  const {changePage} = props;

  const logOff = () => {
    localStorage.clear();
    changePage("USER")
  }
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  useEffect(() => {
  if (!state.gameOver || !state.winner) return;

  const body = new URLSearchParams({
    rounds: String(roundCount),
    didWin: String(winner === "player"),
  });

  sendRequest("/api/games/finish", "POST", body);
}, [state.gameOver]);

  const {
    playerDeck, computerDeck,
    playerCard, computerCard,
    roundResult, roundCount,
    warPile, phase,
    gameOver, winner,
  } = state;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>War</h1>

      <GameInfo
        roundCount={roundCount}
        roundResult={roundResult}
        gameOver={gameOver}
        winner={winner}
      />

      {warPile.length > 0 && (
        <p style={{ textAlign: "center", color: "var(--color-text-warning)" }}>
          {warPile.length} cards in play
        </p>
      )}

      {/* Player and computer side by side */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          margin: "24px 0",
          gap: 16,
        }}
      >
        <PlayerArea
          label="You"
          deckSize={playerDeck.length}
          currentCard={playerCard}
          revealed={phase === "revealed"}
        />

        <div style={{ alignSelf: "center", fontSize: 32 }}>VS</div>

        <PlayerArea
          label="Computer"
          deckSize={computerDeck.length}
          currentCard={computerCard}
          revealed={phase === "revealed"}
        />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        {!gameOver && (
          <button onClick={() => dispatch({ type: "FLIP_CARDS" })}>
            {phase === "waiting" ? "Flip Cards" : "Next Round"}
          </button>
        )}
        <button onClick={() => dispatch({ type: "NEW_GAME" })}>
          New Game
        </button>
        <button onClick={() => changePage("HISTORY")}>View History</button>
        <button onClick={() => logOff()}>Log off</button>
      </div>
    </div>
  );
}

export default GamePage;