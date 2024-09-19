import { useContext, useEffect } from "react";
import style from "./homeContent.module.css";
import PageContext from "../Contexts/PageContext";
import { useNavigate } from "react-router-dom";

const HomeContent = () => {
    const navigate = useNavigate();
    const { loggedUser } = useContext(PageContext);

    useEffect(() => {
        if (loggedUser) {
            navigate("/dashboard");
        }
    }, [loggedUser, navigate]);

    if (loggedUser) {
        // Prevent rendering the rest of the page if redirecting
        return null;
    }

    return (
        <main className={style.mainContainer}>
            <div className={style.messageDiv}>
                <h2 className={style.message}>
                    Always forgetting what you need when you go grocery
                    shopping?
                </h2>
                <h2 className={style.message}>
                    Create a grocery list based on what you have at home, or
                    start a custom list just for you.
                </h2>
            </div>
        </main>
    );
};

export default HomeContent;
