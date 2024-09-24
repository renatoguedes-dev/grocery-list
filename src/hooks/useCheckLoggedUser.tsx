import { useContext, useEffect } from "react";
import PageContext from "../components/Contexts/PageContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useCheckLoggedUser = () => {
    const navigate = useNavigate();
    const { loggedUser, setLoggedUser } = useContext(PageContext);

    useEffect(() => {
        const loggedUserData = Cookies.get("tokenData");

        if (!loggedUserData) {
            navigate("/");
            return;
        }

        setLoggedUser(JSON.parse(loggedUserData));
    }, [navigate, setLoggedUser]);

    return !!loggedUser;
};

export default useCheckLoggedUser;
