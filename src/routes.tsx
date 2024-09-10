import App from "./Pages/App/App";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import HomeContent from "./components/HomeContent/HomeContent";
import SignUp from "./Pages/SignUpPage/SignUpPage";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ResetPassword from "./Pages/ResetPassword/resetPassword";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomeContent />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/welcome",
                element: <WelcomePage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },

            {
                path: "/reset-password",
                element: <ResetPassword />,
            },
        ],
    },
];

export default routes;
