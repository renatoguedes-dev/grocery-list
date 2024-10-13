import { createContext, Dispatch, SetStateAction } from "react";
import { ILoggedUser } from "../../In-memory-repository/usersDatabase";

interface Page {
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
  loggedUser: ILoggedUser | undefined;
  setLoggedUser: Dispatch<SetStateAction<ILoggedUser | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultPageContext: Page = {
  activeSection: "",
  setActiveSection: () => {},
  loggedUser: undefined,
  setLoggedUser: () => {},
  loading: false,
  setLoading: () => {},
};

const PageContext = createContext<Page>(defaultPageContext);

export default PageContext;
