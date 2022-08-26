import { useContext } from "react";
import DataContext from "../../context/dataContext";

function ResetButton() {
  const {
    setPlayersHand,
    dealersHand,
    setDealersHand,
    dealersTurn,
    setDealersTurn,
    endTurn,
    setEndTurn,
    setAlert,
    setCountWins,
  } = useContext(DataContext);

  function resetHands() {
    setDealersHand([]);
    setPlayersHand([]);
    setDealersTurn(false);
    setEndTurn(false);
    if (dealersTurn) {
      setCountWins((state) => {
        return { player: state.player, house: state.house + 1 };
      });
    }
    setAlert({ active: false, message: "" });
  }

  return (
    <button onClick={resetHands} disabled={dealersHand?.length < 1}>
      {!dealersTurn && endTurn ? `New Game` : `Quit`}
    </button>
  );
}

export default ResetButton;
