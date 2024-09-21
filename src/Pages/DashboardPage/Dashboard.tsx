import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import style from "./dashboard.module.css";
import { useContext, useEffect } from "react";
import PageContext from "../../components/Contexts/PageContext";
import DashboardContent from "../../components/DashboardContent/DashboardContent";

const Dashboard = () => {
    const navigate = useNavigate();
    const { loggedUser } = useContext(PageContext);

    useEffect(() => {
        if (!loggedUser) {
            navigate("/");
        }
    }, [loggedUser, navigate]);

    if (!loggedUser) {
        return null;
    }

    return (
        <main className={style.mainContainer}>
            <Sidebar />
            <DashboardContent />
        </main>
    );
};

export default Dashboard;
