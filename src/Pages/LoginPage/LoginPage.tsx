import LoginForm from "../../components/LoginForm/LoginForm";
import style from "./loginPage.module.css";
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";
import { useContext } from "react";
import PageContext from "../../components/Contexts/PageContext";
import Spinner from "../../components/Spinner/Spinner";

const LoginPage = () => {
  useRedirectIfLoggedIn();

  const { loading } = useContext(PageContext);

  return (
    <div className="container">
      <main className={style.mainContainer}>
        {!loading && <LoginForm />}

        {loading && <Spinner loading={loading} />}
      </main>
    </div>
  );
};

export default LoginPage;
