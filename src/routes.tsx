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
import Cookies from "js-cookie";

const token = Cookies.get("token");

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

if (token) {
    console.log(routes[0].children);

    routes[0].children.push(
        {
            path: "/welcome",
            element: <WelcomePage />,
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
        }
    );
    
    console.log(routes[0].children);
}

export default routes;
