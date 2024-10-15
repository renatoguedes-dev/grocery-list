import { useContext, useEffect } from "react";
import style from "./homeContent.module.css";
import PageContext from "../Contexts/PageContext";
import { useNavigate } from "react-router-dom";
import { wakeBackend } from "../../axios";

const HomeContent = () => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(PageContext);

  const WakeBackendAPI = async () => {
    try {
      await wakeBackend();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    WakeBackendAPI();
    console.log("here");
    

    if (loggedUser) {
      navigate("/lists");
    }
  }, [loggedUser, navigate]);

  if (loggedUser) {
    // Prevent rendering the rest of the page if redirecting
    return null;
  }

  return (
    <div className="container">
      <main className={style.mainContainer}>
        <div className={style.messageDiv}>
          <h2 className={style.message}>
            Always forgetting what you need when you go grocery shopping?
          </h2>
          <h2 className={style.message}>
            Create a grocery list based on what you have at home, or start a
            custom list just for you.
          </h2>
        </div>
      </main>
    </div>
  );
};

export default HomeContent;
