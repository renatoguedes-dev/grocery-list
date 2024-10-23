import style from "./header.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import PageContext from "../Contexts/PageContext";
import logo from "../../assets/images/logo.png";
import profileIcon from "../../assets/images/profile.png";
import Cookies from "js-cookie";
import LogoutIcon from "../icons/LogoutIcon";
import ProfileIcon from "../icons/ProfileIcon";
import MenuBtnBurger from "../MenuBtnBurger/MenuBtnBurger";

const Header = () => {
  const token = Cookies.get("token");

  const { activeSection } = useContext(PageContext);

  const [expanded, setExpanded] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const htmlRef = useRef(document.documentElement);

  useEffect(() => {
    htmlRef.current.classList.toggle("menu-open");
  }, [menuOpen]);

  const handleClickLogo = () => {
    if (menuOpen) {
      setMenuOpen((prev) => !prev);
    }

    return;
  };

  return (
    <header className={style.header}>
      <Link to="/" className={style.nameLogo} onClick={handleClickLogo}>
        <img src={logo} alt="website's logo" className={style.logo} />
        <h1 className={style.brand}>
          <strong>GroceryPlanner</strong>
        </h1>
      </Link>

      {!token && activeSection === "homepage" && (
        <>
          <MenuBtnBurger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <nav className={`${style.navLinks} ${menuOpen ? style.open : ""}`}>
            <Link
              to="/login"
              className={`${style.links}`}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className={`${style.links}`}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              Sign Up
            </Link>
          </nav>
        </>
      )}

      {token && (
        <>
          <MenuBtnBurger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <nav className={`${style.navLinks} ${menuOpen ? style.open : ""}`}>
            <Link
              to="/lists"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`${style.links} ${
                activeSection === "lists" ? style.active : ""
              }`}
            >
              <p>Lists</p>
            </Link>

            <Link
              to="/inventory"
              onClick={() => setMenuOpen((prev) => !prev)}
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
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <ProfileIcon className={style.icons} />
                    <p>Settings</p>
                  </Link>

                  <Link
                    to="/logout"
                    className={style.accountLinks}
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <LogoutIcon className={style.icons} />
                    <p>Logout</p>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
