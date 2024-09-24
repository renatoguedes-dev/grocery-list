import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContext from "../components/Contexts/PageContext";

const useRedirectIfLoggedIn = () => {
    const navigate = useNavigate();

    const { loggedUser } = useContext(PageContext);

    useEffect(() => {
        if (loggedUser) {
            navigate("/dashboard");
        }
    }, [loggedUser, navigate]);
};

export default useRedirectIfLoggedIn;
