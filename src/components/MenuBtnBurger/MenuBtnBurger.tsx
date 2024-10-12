import { Dispatch, SetStateAction } from "react";
import style from "./menuBtnBurger.module.css";

interface MenuBtnBurgerProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const MenuBtnBurger = ({ menuOpen, setMenuOpen }: MenuBtnBurgerProps) => {
  
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`${style.menuBtn} ${menuOpen ? style.open : ""}`}
      onClick={toggleMenu}
    >
      <div className={style.menuBtn__burger}></div>
    </div>
  );
};

export default MenuBtnBurger;
