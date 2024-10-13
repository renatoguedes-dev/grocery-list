import App from "./Pages/App/App";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import HomeContent from "./components/HomeContent/HomeContent";
import SignUp from "./Pages/SignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ResetPassword from "./Pages/ResetPassword/resetPassword";
import Dashboard from "./Pages/DashboardPage/Dashboard";
import InventoryPage from "./Pages/Inventory/Inventory";
import Lists from "./Pages/Lists/Lists";
import Profile from "./Pages/Profile/Profile";
import Logout from "./Pages/Logout/Logout";
import Cookies from "js-cookie";
import ListById from "./Pages/ListById/ListById";
import InventoryList from "./Pages/InventoryList/InventoryList";

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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/lists",
        element: <Lists />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

if (token) {
  routes[0].children.push(
    {
      path: "/lists/:id",
      element: <ListById />,
    },
    {
      path: "/inventory/list",
      element: <InventoryList />,
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
}

export default routes;
