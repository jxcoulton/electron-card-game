import { useContext } from "react";
import DataContext from "../../context/dataContext";

function StartGameButton() {
  const {
    deckId,
    dealersHand,
    setDealersHand,
    setPlayersHand,
    setDealersTurn,
    setEndTurn,
  } = useContext(DataContext);

  function startTurn() {
    setDealersHand([]);
    setPlayersHand([]);
    setDealersTurn(false);
    setEndTurn(false);

    if (dealersHand.length === 0) {
      const fetchFlop = async () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((resData) => {
            setDealersHand([
              ...dealersHand,
              ...resData.cards.slice(0, 2).map((card) => {
                return {
                  suit: card.suit,
                  value: card.value,
                  img: card.image,
                };
              }),
            ]);
            setPlayersHand([
              ...dealersHand,
              ...resData.cards.slice(2).map((card) => {
                return {
                  suit: card.suit,
                  value: card.value,
                  img: card.image,
                };
              }),
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      fetchFlop();
    }
  }

  return (
    <button onClick={startTurn} disabled={dealersHand?.length > 0}>
      Ready
    </button>
  );
}

export default StartGameButton;
