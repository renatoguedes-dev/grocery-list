import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import style from "./dashboard.module.css";

const Dashboard = () => {
    return (
        <main className={style.mainContainer}>
            <Sidebar />
            <Outlet />
        </main>
    );
};

export default Dashboard;
