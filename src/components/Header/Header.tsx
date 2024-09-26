import style from "./header.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import PageContext from "../Contexts/PageContext";
import logo from "../../assets/images/logo.png";
import profileIcon from "../../assets/images/profile.png";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import Cookies from "js-cookie";
import LogoutIcon from "../icons/LogoutIcon/LogoutIcon";
import SettingsIcon from "../icons/SettingsIcon/ProfileIcon";

const Header = () => {
    const token = Cookies.get("token");

    useCheckLoggedUser();

    const { activeSection, loggedUser } = useContext(PageContext);

    const [expanded, setExpanded] = useState(false);

    return (
        <header className={style.header}>
            <Link to="/" className={style.nameLogo}>
                <img src={logo} alt="website's logo" className={style.logo} />
                <h1 className={style.brand}>
                    <strong>GroceryPlanner</strong>
                </h1>
            </Link>

            {!loggedUser && activeSection === "homepage" && (
                <nav className={style.navLinks}>
                    <Link to="/login" className={`${style.loginLink}`}>
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className={`${style.links} ${style.signUpLink}`}
                    >
                        Sign Up
                    </Link>
                </nav>
            )}

            {token && (
                <nav className={style.navLinks}>
                    <Link
                        to="/lists"
                        className={`${style.links} ${
                            activeSection === "lists" ? style.active : ""
                        }`}
                    >
                        <p>Lists</p>
                    </Link>

                    <Link
                        to="/inventory"
                        className={`${style.links} ${
                            activeSection === "inventory" ? style.active : ""
                        }`}
                    >
                        <p>Inventory</p>
                    </Link>

                    <div
                        className={style.accountBtnAndOther}
                        onMouseEnter={() => setExpanded(true)}
                        onMouseLeave={() => setExpanded(false)}
                    >
                        <div
                            className={`${style.profileLink} ${
                                expanded ? style.expanded : ""
                            }`}
                        >
                            <img
                                src={profileIcon}
                                alt="user icon"
                                className={style.profileIcon}
                            />
                            <p>Account</p>
                        </div>
                        {expanded && (
                            <div className={style.menuHover}>
                                <Link
                                    to="/profile"
                                    className={style.accountLinks}
                                >
                                    <SettingsIcon className={style.icons} />
                                    <p>Settings</p>
                                </Link>

                                <Link
                                    to="/logout"
                                    className={style.accountLinks}
                                >
                                    <LogoutIcon className={style.icons} />
                                    <p>Logout</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
