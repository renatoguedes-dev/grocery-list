import { Link } from "react-router-dom";
import CreateListBtn from "../CreateCustomListBtn/CreateCustomListBtn";
import style from "./dashboardContent.module.css";
import { useContext } from "react";
import PageContext from "../Contexts/PageContext";

const DashboardContent = () => {
    const { loggedUser} = useContext(PageContext)
    const firstName = loggedUser?.name.split(" ")[0]

    return (
        <main className={style.mainContainer}>
            <h1>Welcome Back, {firstName}!</h1>
            <h2>Choose an option:</h2>
            <Link to="/dashboard/lists">Check My Lists</Link>
            <CreateListBtn />
        </main>
    );
};

export default DashboardContent;
