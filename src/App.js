import { useContext, useEffect } from "react";
import DrawCardButton from "./components/buttons/DrawCardButton";
import EndTurnButton from "./components/buttons/EndTurnButton";
import ResetButton from "./components/buttons/ResetButton";
import ShowTotalButton from "./components/buttons/ShowTotalButton";
import StartGameButton from "./components/buttons/StartGameButton";
import DealerCards from "./components/cards/DealerCards";
import PlayerCards from "./components/cards/PlayerCards";
import Alerts from "./components/common/Alerts";
import CountWins from "./components/common/CountWins";
import DisplayTotal from "./components/common/DisplayTotal";
import { DataContext } from "./context/dataContext";

function App() {
  const { playersHand, deckId, setDeckId, dealersHand, showTotal } =
    useContext(DataContext);

  //set deck id
  useEffect(() => {
    if (deckId === "") {
      const fetchDeck = async () => {
        await fetch(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Something went wrong");
          })
          .then((resData) => {
            setDeckId(resData.deck_id);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      fetchDeck();
    } else {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`).then(
        (res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Something went wrong");
        }
      );
    }
  }, [deckId, playersHand, dealersHand, setDeckId]);

  return (
    <div className="App">
      <StartGameButton />
      <DrawCardButton />
      <EndTurnButton />
      <ResetButton />
      <ShowTotalButton />
      <CountWins />
      <DealerCards />
      <Alerts />
      {showTotal && dealersHand?.length > 0 && <DisplayTotal />}
      <PlayerCards />
    </div>
  );
}

export default App;
