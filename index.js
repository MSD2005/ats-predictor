import React, { useState } from "react";

export default function Home() {
  const [games, setGames] = useState([
    { home: "", away: "", homeScore: "", awayScore: "", spread: "", result: "" },
  ]);

  const calculateATS = (homeScore, awayScore, spread) => {
    const hs = parseFloat(homeScore);
    const as = parseFloat(awayScore);
    const sp = parseFloat(spread);
    if (isNaN(hs) || isNaN(as) || isNaN(sp)) return "Invalid";

    const margin = hs - as;
    if (sp < 0) {
      return margin > Math.abs(sp) ? "Cover" : "No Cover";
    } else {
      return -margin > Math.abs(sp) ? "Cover" : "No Cover";
    }
  };

  const handleChange = (index, field, value) => {
    const updatedGames = [...games];
    updatedGames[index][field] = value;
    updatedGames[index].result = calculateATS(
      updatedGames[index].homeScore,
      updatedGames[index].awayScore,
      updatedGames[index].spread
    );
    setGames(updatedGames);
  };

  const addGame = () => {
    setGames([...games, { home: "", away: "", homeScore: "", awayScore: "", spread: "", result: "" }]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>College Football ATS Predictor</h1>
      {games.map((game, index) => (
        <div key={index} style={{ marginBottom: 20, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
          <input placeholder="Home Team" value={game.home} onChange={(e) => handleChange(index, "home", e.target.value)} />
          <input placeholder="Away Team" value={game.away} onChange={(e) => handleChange(index, "away", e.target.value)} />
          <input placeholder="Home Score" value={game.homeScore} onChange={(e) => handleChange(index, "homeScore", e.target.value)} />
          <input placeholder="Away Score" value={game.awayScore} onChange={(e) => handleChange(index, "awayScore", e.target.value)} />
          <input placeholder="Spread" value={game.spread} onChange={(e) => handleChange(index, "spread", e.target.value)} />
          <div><strong>Prediction:</strong> {game.result}</div>
        </div>
      ))}
      <button onClick={addGame}>Add Another Game</button>
    </div>
  );
}