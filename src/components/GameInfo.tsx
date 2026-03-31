//----------------------------------------------
//Name: Game Info component
//Abstract: Displays the information of each round when the player or computer wins it takes that info
// and processes it to display the results. This also dusokays the round count and result.
//----------------------------------------------
import type { RoundResult } from "../types/game";

interface Props {
  roundCount: number;
  roundResult: RoundResult;
  gameOver: boolean;
  winner: "player" | "computer" | null;
}

const resultMessage: Record<NonNullable<RoundResult>, string> = {
  player: "You win this round",
  computer: "Computer wins this round.",
  tie: "War!",
};

const GameInfo = ({ roundCount, roundResult, gameOver, winner }: Props) => {
  return (
    <div style={{ textAlign: "center", margin: "16px 0" }}>
      <p style={{ marginBottom: 8 }}>
        <strong>Round:</strong> {roundCount}
      </p>

      {gameOver && winner && (
        <p
          style={{
            fontSize: 22,
            fontWeight: 500,
            color:
              winner === "player"
                ? "var(--color-text-success)"
                : "var(--color-text-danger)",
          }}
        >
          {winner === "player" ? " You win the game!" : "Computer wins the game!"}
        </p>
      )}

      {!gameOver && roundResult && (
        <p style={{ fontSize: 18 }}>{resultMessage[roundResult]}</p>
      )}
    </div>
  );
};

export default GameInfo;