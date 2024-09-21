import App from "./Pages/App/App";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import HomeContent from "./components/HomeContent/HomeContent";
import SignUp from "./Pages/SignUpPage/SignUpPage";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ResetPassword from "./Pages/ResetPassword/resetPassword";
import Dashboard from "./Pages/DashboardPage/Dashboard";
import InventoryPage from "./Pages/Inventory/Inventory";
import Lists from "./Pages/Lists/Lists";
import Profile from "./Pages/Profile/Profile";
import Logout from "./Pages/Logout/Logout";

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
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/lists",
                element: <Lists />,
            },
            {
                path: "/inventory",
                element: <InventoryPage />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
        ],
    },
];

export default routes;
