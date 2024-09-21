import style from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import listIcon from "../../assets/images/listIcon.png";
import inventoryIcon from "../../assets/images/inventoryIcon.png";
import logoutIcon from "../../assets/images/logoutIcon.png";
import userIcon from "../../assets/images/user.png";
import PageContext from "../Contexts/PageContext";
import { useContext } from "react";

const Sidebar = () => {
    const { activeSection } = useContext(PageContext);

    return (
        <div className={style.sidebar}>
            <nav className={style.nav}>
                <NavLink
                    to="/lists"
                    end
                    className={`${style.navLink} ${
                        activeSection === "lists" ? style.active : ""
                    }`}
                >
                    <img
                        src={listIcon}
                        alt="lists icon"
                        className={style.icons}
                    />
                    <p>My Lists</p>
                </NavLink>
                <NavLink
                    to="/inventory"
                    className={`${style.navLink} ${
                        activeSection === "inventory" ? style.active : ""
                    }`}
                >
                    <img
                        src={inventoryIcon}
                        alt="inventory icon"
                        className={style.icons}
                    />
                    <p>My Inventory</p>
                </NavLink>
                <NavLink
                    to="/profile"
                    className={`${style.navLink} ${
                        activeSection === "profile" ? style.active : ""
                    }`}
                >
                    <img
                        src={userIcon}
                        alt="user icon"
                        className={style.icons}
                    />
                    <p>Personal Data</p>
                </NavLink>
                <NavLink
                    to="/logout"
                    className={`${style.navLink} ${
                        activeSection === "logout" ? style.active : ""
                    }`}
                >
                    <img
                        src={logoutIcon}
                        alt="logout icon"
                        className={style.icons}
                    />
                    <p>Logout</p>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
