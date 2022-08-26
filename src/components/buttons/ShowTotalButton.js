import { useContext } from "react";
import DataContext from "../../context/dataContext";

function ShowTotalButton() {
  const { setShowTotal } = useContext(DataContext);
  return (
    <div>
      <input
        type="checkbox"
        id="total"
        onClick={(e) => setShowTotal(e.target.checked)}
      />
      <label htmlFor="total">Show Totals</label>
    </div>
  );
}

export default ShowTotalButton;
