import LoginForm from "../../components/LoginForm/LoginForm";
import style from "./loginPage.module.css";
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";

const LoginPage = () => {
  useRedirectIfLoggedIn();

  return (
    <div className="container">
      <main className={style.mainContainer}>
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
