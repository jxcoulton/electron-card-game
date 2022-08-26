import { useEffect, useContext } from "react";
import DataContext from "../../context/dataContext";

function CountWins() {
  const {
    playersTotal,
    dealersTotal,
    dealersTurn,
    endTurn,
    setAlert,
    countWins,
    setCountWins,
  } = useContext(DataContext);

  useEffect(() => {
    if (!dealersTurn && endTurn) {
      if (
        playersTotal > 21 ||
        (dealersTotal <= 21 && playersTotal < dealersTotal)
      ) {
        setCountWins((state) => {
          return { player: state.player, house: state.house + 1 };
        });
        setAlert({ active: true, message: "House Wins" });
      } else if (
        dealersTotal > 21 ||
        (playersTotal <= 21 && dealersTotal < playersTotal)
      ) {
        setCountWins((state) => {
          return { player: state.player + 1, house: state.house };
        });
        setAlert({ active: true, message: "Player Wins" });
      } else {
        setAlert({ active: true, message: "Draw" });
      }
    }
  }, [
    playersTotal,
    dealersTotal,
    dealersTurn,
    endTurn,
    setAlert,
    setCountWins,
  ]);

  return (
    <div>
      <p>{countWins.player}</p>
      <p>{countWins.house}</p>
    </div>
  );
}

export default CountWins;
