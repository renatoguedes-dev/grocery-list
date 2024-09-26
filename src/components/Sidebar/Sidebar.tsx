import style from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import PageContext from "../Contexts/PageContext";
import { useContext } from "react";
import ListIcon from "../icons/ListIcon/ListIcon";
import InventoryIcon from "../icons/InventoryIcon/InventoryIcon";
import ProfileIcon from "../icons/SettingsIcon/ProfileIcon";
import LogoutIcon from "../icons/LogoutIcon/LogoutIcon";

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
                    <ListIcon className={style.icons} />
                    <p>My Lists</p>
                </NavLink>
                <NavLink
                    to="/inventory"
                    className={`${style.navLink} ${
                        activeSection === "inventory" ? style.active : ""
                    }`}
                >
                    <InventoryIcon className={style.icons} />
                    <p>My Inventory</p>
                </NavLink>
                <NavLink
                    to="/profile"
                    className={`${style.navLink} ${
                        activeSection === "profile" ? style.active : ""
                    }`}
                >
                    <ProfileIcon className={style.icons} />
                    <p>Personal Data</p>
                </NavLink>
                <NavLink
                    to="/logout"
                    className={`${style.navLink} ${
                        activeSection === "logout" ? style.active : ""
                    }`}
                >
                    <LogoutIcon className={style.icons} />
                    <p>Logout</p>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
