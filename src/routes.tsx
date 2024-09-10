import ResetPassword from "./components/ResetPassword/resetPassword";
import HomeContent from "./components/HomeContent/HomeContent";
import Homepage from "./components/Homepage/Homepage";
import LoginPage from "./components/LoginPage/LoginPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import SignUp from "./components/SignUpPage/SignUpPage";

const routes = [
    {
        path: "/",
        element: <Homepage />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomeContent />
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/reset-password",
                element: <ResetPassword />,
            },
        ],
    },
];

export default routes;
