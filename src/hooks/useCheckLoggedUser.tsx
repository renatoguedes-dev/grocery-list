import { useContext, useEffect } from "react";
import PageContext from "../components/Contexts/PageContext";
import { useNavigate } from "react-router-dom";

const useCheckLoggedUser = () => {
    const navigate = useNavigate();
    const { loggedUser } = useContext(PageContext);

    useEffect(() => {
        if (!loggedUser) {
            navigate("/");
        }
    }, [loggedUser, navigate]);

    return !!loggedUser;
};

export default useCheckLoggedUser;
