import { useContext } from "react";
import { DataContext } from "../../context/dataContext";

function DrawCardButton() {
  const {
    playersTotal,
    playersHand,
    setPlayersHand,
    dealersHand,
    endTurn,
    fetchOne,
  } = useContext(DataContext);

  function drawCard() {
    if (playersTotal < 21) {
      fetchOne()
        .then((resData) => {
          setPlayersHand([
            ...playersHand,
            {
              suit: resData.cards[0].suit,
              value: resData.cards[0].value,
              img: resData.cards[0].image,
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <button
      onClick={drawCard}
      disabled={playersTotal >= 21 || endTurn || dealersHand?.length < 1}
    >
      Hit
    </button>
  );
}

export default DrawCardButton;
