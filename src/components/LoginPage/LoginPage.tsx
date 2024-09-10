import LoginForm from "../LoginForm/LoginForm";
import style from "./loginPage.module.css"

const LoginPage = () => {
    return (
        <main className={style.mainContainer}>
            <LoginForm />
        </main>
    );
};

export default LoginPage;
