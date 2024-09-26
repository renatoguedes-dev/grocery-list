import style from "./dashboard.module.css";
import { useContext } from "react";
import PageContext from "../../components/Contexts/PageContext";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";

const Dashboard = () => {
    useCheckLoggedUser();

    const { loggedUser } = useContext(PageContext);

    if (!loggedUser) {
        return null;
    }

    return (
        <main className={style.mainContainer}>
            <DashboardContent />
        </main>
    );
};

export default Dashboard;
