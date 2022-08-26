import { useContext, useEffect } from "react";
import DataContext from "../../context/dataContext";

function DealerCards() {
  const {
    dealersHand,
    setDealersHand,
    dealersTurn,
    setDealersTurn,
    setDealersTotal,
    endTurn,
    fetchOne,
    findTotal,
  } = useContext(DataContext);

  useEffect(() => {
    let update = true;
    if (dealersHand?.length > 0) {
      setDealersTotal(findTotal(dealersHand));

      if (dealersTurn === true) {
        if (findTotal(dealersHand) < 17) {
          setTimeout(() => {
            fetchOne()
              .then((resData) => {
                if (update) {
                  setDealersHand([
                    ...dealersHand,
                    {
                      suit: resData.cards[0].suit,
                      value: resData.cards[0].value,
                      img: resData.cards[0].image,
                    },
                  ]);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }, 1500);
        } else {
          setDealersTurn(false);
        }
      }
    }

    return () => {
      setDealersTotal(0);
      clearTimeout();
      update = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealersHand, dealersTurn, fetchOne]);

  return (
    <div>
      {dealersHand?.map((card, i) => {
        return (
          <img
            className="playing-card"
            key={i}
            src={
              i === 0
                ? endTurn
                  ? card.img
                  : "playing-card-back.jpg"
                : card.img
            }
            alt={`${card.value} of ${card.suit}`}
          />
        );
      })}
    </div>
  );
}

export default DealerCards;
