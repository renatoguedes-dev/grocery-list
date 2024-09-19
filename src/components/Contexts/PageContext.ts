import { createContext, Dispatch, SetStateAction } from "react";
import { ILoggedUser } from "../../In-memory-repository/usersDatabase";

interface Page {
    activeSection: string;
    setActiveSection: Dispatch<SetStateAction<string>>;
    createdUserEmail: string | null;
    setCreatedUserEmail: Dispatch<SetStateAction<string | null>>;
    loggedUser: ILoggedUser | undefined;
    setLoggedUser: Dispatch<SetStateAction<ILoggedUser | undefined>>;
}

const defaultPageContext: Page = {
    activeSection: "",
    setActiveSection: () => {},
    createdUserEmail: null,
    setCreatedUserEmail: () => {},
    loggedUser: undefined,
    setLoggedUser: () => {},
};

const PageContext = createContext<Page>(defaultPageContext);

export default PageContext;
