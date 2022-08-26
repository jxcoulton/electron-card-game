import { useContext } from "react";
import DataContext from "../../context/dataContext";

function DisplayTotal() {
  const { dealersHand, playersTotal, dealersTotal, endTurn, findTotal } =
    useContext(DataContext);

  return (
    <div>
      {/*aces still hav plus 10 if applicable*/}
      <p>
        {endTurn
          ? dealersTotal
          : findTotal([
              dealersHand[1],
              {
                value: "0",
              },
            ]) || 0}
      </p>
      <p>{playersTotal}</p>
    </div>
  );
}

export default DisplayTotal;
