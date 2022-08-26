import { createContext, useState, useCallback } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [deckId, setDeckId] = useState("");
  const [playersTotal, setPlayersTotal] = useState(0);
  const [playersHand, setPlayersHand] = useState([]);
  const [dealersTotal, setDealersTotal] = useState(0);
  const [dealersHand, setDealersHand] = useState([]);
  const [dealersTurn, setDealersTurn] = useState(false);
  const [endTurn, setEndTurn] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [alert, setAlert] = useState({ active: false, message: "" });
  const [countWins, setCountWins] = useState({ player: 0, house: 0 });

  function findValue(value) {
    if (!isNaN(+value)) {
      return +value;
    } else if (value === "ACE") {
      return 1;
    } else if (value === "KING" || value === "QUEEN" || value === "JACK") {
      return 10;
    }
  }

  function findTotal(arr) {
    let total = 0;
    total = arr.reduce((a, b) => {
      return a + findValue(b.value);
    }, 0);

    if (arr.filter((c) => c.value === "ACE").length > 0) {
      for (let i = 0; i < arr.filter((c) => c.value === "ACE").length; i++) {
        if (total + 10 <= 21) {
          total += 10;
        }
      }
    }
    return total;
  }

  const fetchOne = useCallback(async () => {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
    return res;
  }, [deckId]);

  return (
    <DataContext.Provider
      value={{
        playersTotal,
        setPlayersTotal,
        playersHand,
        setPlayersHand,
        dealersTotal,
        setDealersTotal,
        dealersHand,
        setDealersHand,
        dealersTurn,
        setDealersTurn,
        endTurn,
        setEndTurn,
        deckId,
        setDeckId,
        showTotal,
        setShowTotal,
        alert,
        setAlert,
        countWins,
        setCountWins,
        fetchOne,
        findValue,
        findTotal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
