import LoginForm from "../LoginForm/LoginForm";
import style from "./loginPage.module.css"

const LoginPage = () => {
    return (
        <div className={style.root}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
