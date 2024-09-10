import style from "./app.module.css";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContext from "../../components/Contexts/PageContext";

function App() {
    const [activeSection, setActiveSection] = useState<string>("homepage");
    const [createdUserEmail, setCreatedUserEmail] = useState<string | null>(
        null
    );
    const location = useLocation();

    useEffect(() => {
        const section = location.pathname.split("/")[1] || "homepage";

        setActiveSection(section);
    }, [location]);

    const pageContextValue = {
        activeSection,
        setActiveSection,
        createdUserEmail,
        setCreatedUserEmail,
    };

    return (
        <div className={style.root}>
            <PageContext.Provider value={pageContextValue}>
                <Header />

                <Outlet />
            </PageContext.Provider>
        </div>
    );
}

export default App;
