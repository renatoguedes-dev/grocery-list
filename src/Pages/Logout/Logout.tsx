import style from "./logout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useContext } from "react";
import PageContext from "../../components/Contexts/PageContext";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import Cookies from "js-cookie";

const Logout = () => {
    useCheckLoggedUser();

    const { loggedUser } = useContext(PageContext);

    const logout = () => {
        Cookies.remove("tokenData");
        Cookies.remove("token");

        window.location.href = "/"
    };

    return (
        <div className="container">
            <Sidebar />
            <main className="mainContainer">
                <div className={style.logOutDiv}>
                    <p className={style.logOutText}>
                        Logged in as{" "}
                        <span className={style.logOutEmail}>
                            {loggedUser?.email}
                        </span>
                    </p>
                    <button
                        onClick={() => logout()}
                        className={style.logOutBtn}
                    >
                        Log Out
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Logout;
