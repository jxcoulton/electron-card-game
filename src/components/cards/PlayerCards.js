import { useContext, useEffect } from "react";
import DataContext from "../../context/dataContext";

function PlayerCards() {
  const {
    playersHand,
    setPlayersTotal,
    setDealersTurn,
    setEndTurn,
    findTotal,
  } = useContext(DataContext);

  useEffect(() => {
    if (playersHand?.length > 0) {
      setPlayersTotal(findTotal(playersHand));
    }

    if (findTotal(playersHand) > 21) {
      setDealersTurn(false);
      setEndTurn(true);
    }

    return () => setPlayersTotal(0);
  }, [playersHand, setPlayersTotal, setEndTurn, findTotal, setDealersTurn]);

  return (
    <div>
      {playersHand?.map((card, i) => {
        return (
          <img
            className="playing-card"
            key={i}
            src={card.img}
            alt={`${card.value} of ${card.suit}`}
          />
        );
      })}
    </div>
  );
}

export default PlayerCards;
