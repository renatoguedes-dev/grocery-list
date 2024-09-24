import style from "./header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import PageContext from "../Contexts/PageContext";
import logo from "../../assets/images/logo.png";
import profileIcon from "../../assets/images/profile.png";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";

const Header = () => {
    const { activeSection, loggedUser } = useContext(PageContext);
    useCheckLoggedUser()

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
                    <Link
                        to="/login"
                        className={`${style.links} ${style.loginLink}`}
                    >
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

            {(activeSection === "dashboard" ||
                activeSection === "lists" ||
                activeSection === "inventory") && (
                <Link
                    to="/profile"
                    className={`${style.links} ${style.profileLink}`}
                >
                    <img
                        src={profileIcon}
                        alt="user icon"
                        className={style.profileIcon}
                    />
                    <p>{loggedUser?.name}</p>
                </Link>
            )}
        </header>
    );
};

export default Header;
