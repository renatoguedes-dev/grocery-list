import Homepage from "./components/Homepage/Homepage";
import LoginPage from "./components/LoginPage/LoginPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import SignUp from "./components/SignUpPage/SignUpPage";

const routes = [
    {
        path: "/",
        element: <Homepage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
];

export default routes;
