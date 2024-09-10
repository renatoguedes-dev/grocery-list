import { createContext, Dispatch, SetStateAction } from "react";

interface Page {
    activeSection: string;
    setActiveSection: Dispatch<SetStateAction<string>>;
    createdUserEmail: string | null;
    setCreatedUserEmail: Dispatch<SetStateAction<string | null>>;
}

const defaultPageContext: Page = {
    activeSection: "",
    setActiveSection: () => {},
    createdUserEmail: null,
    setCreatedUserEmail: () => {}
};

const PageContext = createContext<Page>(defaultPageContext);

export default PageContext;

