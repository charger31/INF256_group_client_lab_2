import { useState, useEffect } from "react";
import { sendRequest } from "../utils/api";
import type { PAGE } from "../types/page";

interface Game {
  id: number;
  rounds: number;
  did_win: boolean;
  finished_at: string;
}

interface Props {
  changePage: (page: PAGE) => void;
}

const HistoryPage = (props: Props) => {
  const { changePage } = props;
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await sendRequest("/api/games", "GET", null);
      if (response.ok) {
        const data = await response.json();
        setGames(data);
      }
    };
    fetchGames();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>Game History</h1>
      {games.length === 0 ? (
        <p>No games played yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>Date</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>Rounds</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>Result</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td style={{ padding: 8 }}>{new Date(game.finished_at).toLocaleDateString()}</td>
                <td style={{ padding: 8 }}>{game.rounds}</td>
                <td style={{ padding: 8 }}>{game.did_win ? "Won" : "Lost"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => changePage("GAME")} style={{ marginTop: 16 }}>
        Back to Game
      </button>
    </div>
  );
};

export default HistoryPage;