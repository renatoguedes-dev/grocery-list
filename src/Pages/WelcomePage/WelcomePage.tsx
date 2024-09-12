import style from "./welcomePage.module.css";
import { useContext, useEffect, useState } from "react";
import PageContext from "../../components/Contexts/PageContext";
import { Link, useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();
    const { createdUserEmail, setCreatedUserEmail, setActiveSection } =
        useContext(PageContext);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        setActiveSection("welcome");

        if (!createdUserEmail) {
            navigate("/");
            setActiveSection("homepage");
        } else {
            setUserEmail(createdUserEmail);
            setCreatedUserEmail(null);
        }
    }, []);

    return (
        <main className={style.mainContainer}>
            <h1>Congratulations!</h1>
            <h1>You successfully created an account for "{userEmail}".</h1>
            <h2>
                Go to the <Link to="/login">Log In page</Link> to access it.
            </h2>
        </main>
    );
};

export default WelcomePage;
