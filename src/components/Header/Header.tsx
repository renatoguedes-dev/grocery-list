import style from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

interface HeaderProps {
    activePage: string;
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ activePage }) => {
    return (
        <header className={style.header}>
            <Link to="/" className={style.nameLogo}>
                <img src={logo} alt="website's logo" className={style.logo} />
                <h1 className={style.brand}>
                    <strong>GroceryPlanner</strong>
                </h1>
            </Link>

            {activePage === "homepage" && (
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
        </header>
    );
};

export default Header;
