import style from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/wishlist.png"


const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.nameLogo}>
                <img src={logo} alt="" className={style.logo} />
                <h1>
                    <strong>Grocery List</strong>
                </h1>
            </div>
            <div className={style.loggedDiv}>
                <Link to="/login" className={style.loginLink}>Log In</Link>
            </div>
        </header>
    );
};

export default Header;
