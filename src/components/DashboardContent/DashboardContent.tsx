import { Link } from "react-router-dom";
import style from "./dashboardContent.module.css";
import { useContext } from "react";
import PageContext from "../Contexts/PageContext";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";

const DashboardContent = () => {
//   useCheckLoggedUser();

  const { loggedUser } = useContext(PageContext);
  const firstName = loggedUser?.name.split(" ")[0];

  return (
    <main className={`${style.mainContainer} mainContainer`}>
      <h1>Welcome Back, {firstName}!</h1>
      <h2>Choose an option:</h2>
      <div className={style.buttonsDiv}>
        <Link to="/lists">
          <button className={style.buttons}>Check My Lists</button>
        </Link>
        <Link to="/inventory">
          <button className={style.buttons}>Check My Inventory</button>
        </Link>
      </div>
    </main>
  );
};

export default DashboardContent;
