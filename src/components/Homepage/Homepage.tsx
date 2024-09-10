import style from "./homepage.module.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Homepage() {
    const [activePage, setActivePage] = useState<string>("homepage");

    return (
        <div className={style.root}>
            <Header activePage={activePage} setActivePage={setActivePage}/>

            <Outlet />
        </div>
    );
}

export default Homepage;
