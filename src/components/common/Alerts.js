import { useContext, useEffect } from "react";
import DataContext from "../../context/dataContext";

function Alerts() {
  const { alert, setAlert } = useContext(DataContext);

  useEffect(() => {
    if (alert.active) {
      setTimeout(() => {
        setAlert({ active: false, message: "" });
      }, 3000);
    }

    return () => clearTimeout();
  }, [alert, setAlert]);

  return <h5>{alert.message}</h5>;
}

export default Alerts;
