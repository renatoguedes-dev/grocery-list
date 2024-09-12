import { Link } from "react-router-dom";
import CreateListBtn from "../CreateCustomListBtn/CreateCustomListBtn";
import style from "./dashboardContent.module.css";

const DashboardContent = () => {
    return (
        <main className={style.mainContainer}>
            <h1>Welcome Back, Fulano!</h1>
            <h2>Choose an option:</h2>
            <Link to="/dashboard/lists">Check My Lists</Link>
            <CreateListBtn />
        </main>
    );
};

export default DashboardContent;
