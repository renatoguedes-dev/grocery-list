import App from "./Pages/App/App";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import HomeContent from "./components/HomeContent/HomeContent";
import SignUp from "./Pages/SignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Dashboard from "./Pages/DashboardPage/Dashboard";
import InventoryPage from "./Pages/Inventory/Inventory";
import Lists from "./Pages/Lists/Lists";
import Profile from "./Pages/Profile/Profile";
import Logout from "./Pages/Logout/Logout";
import ListById from "./Pages/ListById/ListById";
import InventoryList from "./Pages/InventoryList/InventoryList";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

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
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
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
      },
    ],
  },
];

export default routes;
