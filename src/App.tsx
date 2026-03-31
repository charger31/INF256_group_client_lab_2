import { useState } from "react";
import "./App.css";
import type { PAGE } from "./types/page";
import UserPage from "./pages/UserPage";
import GamePage from "./pages/gamePage";

function App() {
  const [currentPage, setCurrentPage] = useState<PAGE>("USER");

  return (
    <>
      {currentPage === "USER" ? (
        <UserPage changePage={setCurrentPage} />
      ) : (
        <GamePage changePage={setCurrentPage} />
      )}
    </>
  );
}

export default App;
