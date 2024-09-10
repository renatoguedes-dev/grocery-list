import SignUpForm from "../SignUpForm/SignUpForm";
import style from "./SignUpPage.module.css"

const SignUp = () => {
    return (
        <main className={style.mainContainer}>
            <SignUpForm />
        </main>
    );
};

export default SignUp;
