import { useContext } from "react";
import DataContext from "../../context/dataContext";

function EndTurnButton() {
  const { playersTotal, dealersHand, setDealersTurn, endTurn, setEndTurn } =
    useContext(DataContext);

  function playerHold() {
    setEndTurn(true);
    setDealersTurn(true);
  }

  return (
    <button
      onClick={playerHold}
      disabled={endTurn || playersTotal > 21 || dealersHand?.length < 1}
    >
      Hold
    </button>
  );
}

export default EndTurnButton;
