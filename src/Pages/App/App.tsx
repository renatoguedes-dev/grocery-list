import style from "./app.module.css";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContext from "../../components/Contexts/PageContext";
import { ILoggedUser } from "../../In-memory-repository/usersDatabase";

function App() {
  const [activeSection, setActiveSection] = useState<string>("homepage");
  const [loggedUser, setLoggedUser] = useState<ILoggedUser | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const locationLength = location.pathname.split("/").length;

    const section =
      location.pathname.split("/")[locationLength - 1] || "homepage";

    console.log(section);

    setActiveSection(section);
  }, [location]);

  const pageContextValue = {
    activeSection,
    setActiveSection,
    loggedUser,
    setLoggedUser,
    loading,
    setLoading,
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
