import style from "./dashboard.module.css";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import Cookies from "js-cookie";

const Dashboard = () => {
  useCheckLoggedUser();

  const token = Cookies.get("token");

  if (!token) {
    return null;
  }

  return (
    <main className={style.mainContainer}>
      <DashboardContent />
    </main>
  );
};

export default Dashboard;
